"use server";

import {CheckoutFormValues, DELIVERY_PRICE} from "@/constants";
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

        await prisma.cart.update({
            where: {id: userCart.id},
            data: {totalAmount: 0},
        });
        await prisma.cartItem.deleteMany({
            where: {cartId: userCart.id},
        });

        const paymentData = await createPayment({
            amount: order.totalAmount + DELIVERY_PRICE,
            orderId: order.id,
            description: 'Оплата замовлення #' + order.id,
        });

        if (!paymentData) throw new Error('Payment data not found');

        const paymentUrl = paymentData.paymentUrl

        const template = await PayOrder({
            orderId: order.id,
            totalAmount: order.totalAmount + DELIVERY_PRICE,
            paymentUrl,
        });
        await sendEmail(
            data.email,
            'Pizza Hub / Оплата замовлення #' + order.id,
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
        const currentUser = await getUserSession();

        if (!currentUser) throw new Error('Користувач не авторизований');

        const findUser = await prisma.user.findFirst({
            where: { id: Number(currentUser.id) }
        });

        if (!findUser) throw new Error('Користувач не знайдено');

        await prisma.user.update({
            where: { id: findUser.id },
            data: {
                fullName: body.fullName,
                email: body.email,
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
        const user = await prisma.user.findFirst({
            where: { email: body.email },
        });

        if (user) {
            if (!user.verified) {
                throw new Error('Пошта не підтверджена');
            }

            throw new Error('Користувач вже існує');
        }

        const createdUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10)
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
            },
        });

        const template = await VerificationUser({ code });
        await sendEmail(
            createdUser.email,
            'Pizza Hub / 📝 Підтвердження реєстрації',
            template
        );
    } catch (err) {
        console.log('Error [CREATE_USER]', err);
        throw err;
    }
}