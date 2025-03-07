"use server";

import {CheckoutFormValues} from "@/constants";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus, Prisma} from "@prisma/client";
import {cookies} from "next/headers";
import {sendEmail} from "@/lib";
import {PayOrder, VerificationUser} from "@/components/shared";
import {createPayment} from "@/lib";
import {getUserSession} from "@/lib/get-user-session";
import {hashSync} from "bcrypt";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = await cookies();
        const cartToken = cookieStore.get('cartToken')?.value;

        if (!cartToken) throw new Error('Cart token not found');

        // Находим корзину по токену
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {token: cartToken},
        });

        if (!userCart) throw new Error('Cart not found');
        if (userCart.totalAmount === 0) throw new Error('Cart is empty');

        // Создаем заказ в базе данных
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        });

        // Очищаем корзину
        await prisma.cart.update({
            where: {id: userCart.id},
            data: {totalAmount: 0},
        });
        await prisma.cartItem.deleteMany({
            where: {cartId: userCart.id},
        });

        // Создаем платежные данные для LiqPay
        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: 'Оплата заказа #' + order.id,
        });

        if (!paymentData) throw new Error('Payment data not found');

        const paymentUrl = paymentData.paymentUrl

        const template = await PayOrder({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl,
        });
        await sendEmail(
            data.email,
            'Next Pizza / Оплатите заказ #' + order.id,
            template
        );

        return paymentUrl;
    } catch (err) {
        console.error('[CreateOrder] Server error', err);
        throw err;
    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        // Получаем текущую сессию пользователя
        const currentUser = await getUserSession();

        // Если пользователь не авторизован, выбрасываем ошибку
        if (!currentUser) throw new Error('Пользователь не авторизован');

        // Находим пользователя в базе данных по идентификатору из сессии
        const findUser = await prisma.user.findFirst({
            where: { id: Number(currentUser.id) }
        });

        // Если пользователь не найден, выбрасываем ошибку
        if (!findUser) throw new Error('Пользователь не найден');

        // Обновляем данные пользователя в базе
        await prisma.user.update({
            // Ищем пользователя по id, полученному из сессии
            where: { id: findUser.id },
            data: {
                fullName: body.fullName,
                email: body.email,
                // Если передан новый пароль, хешируем его, иначе оставляем прежний
                password: body.password ? hashSync(body.password as string, 10) : findUser.password
            }
        });
    } catch (err) {
        console.log('Error [UPDATE_USER]', err);
        throw err;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        // Проверяем, существует ли пользователь с данным email
        const user = await prisma.user.findFirst({
            where: { email: body.email },
        });

        if (user) {
            // Если пользователь найден, но почта не подтверждена - выбрасываем ошибку
            if (!user.verified) {
                throw new Error('Почта не подтверждена');
            }
            // Если пользователь уже существует, выбрасываем ошибку
            throw new Error('Пользователь уже существует');
        }

        // Создаем нового пользователя с хешированным паролем
        const createdUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10)
            },
        });

        // Генерируем 6-значный код верификации
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        // Сохраняем код верификации в базе, связываем с созданным пользователем
        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
            },
        });

        // Формируем шаблон письма с кодом верификации
        const template = await VerificationUser({ code });
        // Отправляем письмо для подтверждения регистрации
        await sendEmail(
            createdUser.email,
            'Next Pizza / 📝 Подтверждение регистрации',
            template
        );
    } catch (err) {
        console.log('Error [CREATE_USER]', err);
        throw err;
    }
}