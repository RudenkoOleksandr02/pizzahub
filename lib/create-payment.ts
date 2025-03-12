import crypto from 'crypto';

interface Props {
    description: string;
    orderId: number;
    amount: number;
}

export async function createPayment(details: Props): Promise<{paymentUrl: string}> {
    const params = {
        public_key: process.env.LIQPAY_PUBLIC_KEY,
        version: '3',
        action: 'pay',
        amount: details.amount,
        currency: 'UAH',
        description: details.description,
        order_id: details.orderId.toString(),
        result_url: process.env.LIQPAY_RESULT_URL
    };

    const jsonString = JSON.stringify(params);
    const data = Buffer.from(jsonString).toString('base64');

    const signatureString = process.env.LIQPAY_PRIVATE_KEY + data + process.env.LIQPAY_PRIVATE_KEY;
    const signature = crypto
        .createHash('sha1')
        .update(signatureString)
        .digest('base64');

    return {
        paymentUrl: `https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`,
    }
}
