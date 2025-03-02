"use server"

import {CheckoutFormValues} from "@/constants";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus} from "@prisma/client";
import {cookies} from "next/headers";
import {sendEmail} from "@/lib";
import {PayOrder} from "@/components/shared";

export async function createOrder(data: CheckoutFormValues) {
    try {
        // Получаем токен корзины из cookies
        const cookieStore = await cookies();
        const cartToken = cookieStore.get("cartToken")?.value;

        if (!cartToken) throw new Error(`Cart token not found`);

        // Ищем корзину пользователя в базе данных
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken
            }
        });

        // Проверяем, найдена ли корзина и не пустая ли она
        if (!userCart) throw new Error('User cart not found');
        if (userCart.totalAmount === 0) throw new Error('Cart is empty');

        // Создаём новый заказ в базе данных
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                totalAmount: userCart.totalAmount,
                items: JSON.stringify(userCart.items), // Сохраняем товары в формате JSON
                status: OrderStatus.PENDING, // Устанавливаем статус заказа "в ожидании"
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
            }
        });

        // Обнуляем сумму корзины после оформления заказа
        await prisma.cart.update({
            where: {
                id: userCart.id
            },
            data: {
                totalAmount: 0
            }
        });

        // Удаляем все товары из корзины
        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            }
        });

        const reactNode = await PayOrder({
            orderId: order.id,
            totalAmount: userCart.totalAmount,
            paymentUrl: 'https://resend.com/docs/send-with-nextjs'
        }); // Ждём, пока компонент рендерится

        await sendEmail(
            data.email,
            'Next Pizza / оплатите заказ # ' + order.id,
            reactNode
        )

        // Ссылка оплаты
        return ''
    } catch (error) {
        console.log(error);
    }
}
