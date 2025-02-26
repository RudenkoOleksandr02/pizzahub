'use client';

import React from 'react';
import {Button, Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {CartDrawerItem} from "@/components/shared/cart-drawer-item";
import {getCartItemDetails} from "@/lib";
import {useCartStore} from "@/store";
import {PizzaSize, PizzaType} from "@/constants/pizza";

interface Props {
  className?: string;
}
                                    /*
                                       Эквивалентная запись:
                                       interface Props {
                                         children?: React.ReactNode;
                                       }
                                    */
export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    const {totalAmount, items, fetchCartItems, updateItemQuantity, removeCartItem} = useCartStore(state => state);

    React.useEffect(() => {
        fetchCartItems();
    }, []);

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <SheetHeader>
                    <SheetTitle>
                         В корзине <span className="font-bold">{items.length} товара</span>
                    </SheetTitle>
                </SheetHeader>

                <div className="-mx-6 mt-5 overflow-auto flex-1">
                    {items.map(item =>
                        <div className="mb-2" key={item.id}>
                            <CartDrawerItem
                                imageUrl={item.imageUrl}
                                name={item.name}
                                details={item.pizzaSize && item.type
                                    ? getCartItemDetails(
                                        item.ingredients,
                                        item.type as PizzaType,
                                        item.pizzaSize as PizzaSize)
                                    : ''
                                }
                                price={item.price}
                                quantity={item.quantity}
                                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                onClickRemove={() => removeCartItem(item.id)}
                            />
                        </div>
                    )}
                </div>

                <SheetFooter className="-mx-6 bg-whtie p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Итого
                                <div
                                    className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
                            </span>

                            <span className="font-bold text-lg">{totalAmount} ₴</span>
                        </div>

                        <Link href="/checkout">
                            <Button
                                className="w-full h-12 text-base">
                                Оформить заказ
                                <ArrowRight className="w-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
);
};