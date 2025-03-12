'use client'

import React from 'react';
import {CheckoutItem, CheckoutItemSkeleton, WhiteBlock} from "@/components/shared";
import {getCartItemDetails} from "@/lib";
import {PizzaSize, PizzaType} from "@/constants/pizza";
import {CartStateItem} from "@/store";

interface Props {
    items: CartStateItem[];
    removeCartItem: (id: number) => Promise<void>;
    onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
    loading?: boolean;
    className?: string;
}

export const CheckoutCart: React.FC<Props> = ({className, items, removeCartItem, onClickCountButton, loading}) => {
    const [isRendered, setIsRendered] = React.useState(false);

    React.useEffect(() => {
        if (!loading) {
            setIsRendered(true);
        }
    }, [loading])

    return (
        <WhiteBlock title="1. Кошик" className={className}>
            <div className="flex flex-col gap-5">
                {loading
                    && !isRendered
                    && [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index}/>)
                }
                {items.map(item =>
                    <CheckoutItem
                        key={item.id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        details={getCartItemDetails(
                            item.ingredients,
                            item.type as PizzaType,
                            item.pizzaSize as PizzaSize
                        )}
                        price={item.price}
                        quantity={item.quantity}
                        disabled={item.disabled}
                        onClickRemove={() => removeCartItem(item.id)}
                        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                    />
                )}
            </div>
        </WhiteBlock>
    );
};