import {NextRequest, NextResponse} from "next/server";
import crypto from "crypto";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus} from "@prisma/client";
import {CartItemDTO} from "@/services/dto/cart.dto";
import {sendEmail} from "@/lib";
import {OrderSuccess} from "@/components/shared";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const data = formData.get('data') as string;
        const signature = formData.get('signature') as string;

        if (!data || !signature) {
            return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
        }

        const signStr = crypto
            .createHash('sha1')
            .update(process.env.LIQPAY_PRIVATE_KEY + data + process.env.LIQPAY_PRIVATE_KEY)
            .digest('base64');

        if (signStr !== signature) {
            return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
        }

        // Декодируем `data` из base64 в JSON
        const decodedData = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));

        const paymentId = decodedData.payment_id;
        const status = decodedData.status;
        const orderId = decodedData.order_id;

        const order = await prisma.order.findFirst({
            where: {
                id: Number(orderId)
            }
        })

        if (!order) return NextResponse.json({error: 'Order not found'})

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                paymentId: String(paymentId),
                status: status === 'success' ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
            },
        });

        const items = JSON.parse(order.items as string) as CartItemDTO[];

        const template = await OrderSuccess({
            orderId: order.id,
            items
        })

        if (status === 'success') {
            await sendEmail(
                order.email,
                'Pizza Hub | Ваше замовлення успішно оформлено',
                template
            )
        }

        return NextResponse.json({ message: 'Callback received', paymentId, status }, { status: 200 });
    } catch (err) {
        console.error('[Checkout Callback] Error: ' + err);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}