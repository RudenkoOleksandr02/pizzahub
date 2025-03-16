'use client';

import React from 'react';
import {
    Button,
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui";
import Link from "next/link";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {CartDrawerItem} from "@/components/shared/cart/cart-drawer-item";
import {getCartItemDetails} from "@/lib";
import {PizzaSize, PizzaType} from "@/constants/pizza";
import {Title} from "@/components/shared"
import Image from 'next/image'
import {cn} from "@/lib/utils";
import {useCart} from "@/hooks";

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({children}) => {
    const {totalAmount, items, updateItemQuantity, removeCartItem} = useCart();
    const [redirecting, setRedirecting] = React.useState(false);

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
                    <SheetHeader>
                        <SheetTitle>
                            {totalAmount > 0 ? (
                                <>У кошику <span className="font-bold">{items.length} товару</span></>
                            ) : (
                                <span className="sr-only">Кошик</span>
                            )}
                        </SheetTitle>
                    </SheetHeader>

                    {!totalAmount && (
                        <div className="flex flex-col items-center justify-center w-72 mx-auto">
                            <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120}/>
                            <Title size="sm" text="Кошик порожній" className="text-center font-bold my-2"/>
                            <p className="text-center text-neutral-500 mb-5">
                                Додайте хоча б одну піцу, щоб зробити замовлення
                            </p>

                            <SheetClose asChild>
                                <Button className="flex gap-1 justify-between items-center w-56 h-12" size="lg">
                                    <ArrowLeft className="w-5 mr-2" width={20} height={20}/>
                                    <span>Повернутись назад</span>
                                </Button>
                            </SheetClose>
                        </div>
                    )}

                    {totalAmount > 0 && <>
                        <div className="-mx-6 mt-5 overflow-auto flex-1">
                            {items.map(item =>
                                <div className="mb-2" key={item.id}>
                                    <CartDrawerItem
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
                                Разом
                                <div
                                    className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
                            </span>

                                    <span className="font-bold text-lg">{totalAmount} ₴</span>
                                </div>

                                <Link href="/checkout">
                                    <Button
                                        className="w-full h-12 text-base"
                                        loading={redirecting}
                                        onClick={() => setRedirecting(true)}
                                    >
                                        Оформити замовлення
                                        <ArrowRight className="w-5 ml-2"/>
                                    </Button>
                                </Link>
                            </div>
                        </SheetFooter>
                    </>}
                </div>
            </SheetContent>
        </Sheet>
    );
};