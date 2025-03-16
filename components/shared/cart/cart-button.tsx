'use client'

import React from 'react';
import {ArrowRight, ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui";
import {cn} from "@/lib/utils";
import {CartDrawer} from "@/components/shared/cart/cart-drawer";
import {useCartStore} from "@/store";

interface Props {
    className?: string;
}

export const CartButton: React.FC<Props> = ({className}) => {
    const {loading, totalAmount, items} = useCartStore(state => state);

    return (
        <CartDrawer>
            <Button loading={loading} className={cn("group relative", { 'w-[105px]': loading }, className)}>
                <b>{totalAmount} ₴</b>
                <span className="h-full w-[1px] bg-white/30 mx-3"/>
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart size={16} className="relative" strokeWidth={2}/>
                    <b>{items.length}</b>
                </div>
                <ArrowRight size={20}
                            className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"/>
            </Button>
        </CartDrawer>
    );
};