import React from 'react';
import {CheckoutItemDetails, WhiteBlock} from "@/components/shared";
import {ArrowRight, Package, Truck} from "lucide-react";
import {Button, Skeleton} from "@/components/ui";
import {DELIVERY_PRICE} from "@/constants";

interface Props {
    totalAmount: number;
    loading?: boolean;
    className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({totalAmount, loading}) => {
    const totalPrice = totalAmount + DELIVERY_PRICE;

    return (
        <WhiteBlock className="p-6 sticy top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Разом:</span>
                {loading ? <Skeleton className="h-11 w-48"/> : (
                    <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₴</span>
                )}
            </div>

            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Package size={20} className="mr-2 text-gray-300"/>
                        Вартість товарів:
                    </div>
                }
                value={loading ? <Skeleton className="h-7 w-16 rounded-[6px]"/> : `${totalAmount} ₴`}
            />
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Truck size={20} className="mr-2 text-gray-300"/>
                        Доставка:
                    </div>
                }
                value={loading ? <Skeleton className="h-7 w-16 rounded-[6px]"/> : `${DELIVERY_PRICE} ₴`}
            />

            <Button loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Перейти до оплати
                <ArrowRight className="w-5 ml-2"/>
            </Button>
        </WhiteBlock>
    );
};