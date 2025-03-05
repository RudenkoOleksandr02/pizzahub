"use server";

import { CheckoutFormValues } from "@/constants";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib";
import { PayOrder } from "@/components/shared";
import { createPayment } from "@/lib";

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
            where: { token: cartToken },
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
            where: { id: userCart.id },
            data: { totalAmount: 0 },
        });
        await prisma.cartItem.deleteMany({
            where: { cartId: userCart.id },
        });

        // Создаем платежные данные для LiqPay
        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: 'Оплата заказа #' + order.id,
        });

        if (!paymentData) throw new Error('Payment data not found');

        // тут должен обновить paymentId у order
        /*await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });*/

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
