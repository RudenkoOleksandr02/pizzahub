import * as React from 'react';
import {CartItemDTO} from "@/services/dto/cart.dto";

interface Props {
    orderId: number;
    items: CartItemDTO[];
}

export const OrderSuccess: React.FC<Readonly<Props>> = ({orderId, items}) => (
    <div>
        <h1>Дякую за покупку! 🎉</h1>

        <p>Ваше замовлення #{orderId} сплачено. Список товарів:</p>

        <hr/>

        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    {item.productItem.product.name} | {item.productItem.price} ₴ x {item.quantity} шт. ={' '}
                    {item.productItem.price * item.quantity} ₴
                </li>
            ))}
        </ul>

    </div>
);
