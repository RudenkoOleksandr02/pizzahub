import React from 'react';
import {cn} from "@/lib/utils";
import {Title} from "@/components/shared";
import {Button} from "@/components/ui";

interface Props {
    imageUrl: string;
    name: string;
    onClickAdd?: VoidFunction;
    className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
                                                     imageUrl,
                                                     name,
                                                     onClickAdd,
                                                     className
                                                 }) => {
    const textDetails = '30 см, традиционное тесто 30';
    const totalPrice = 350;

    return (
        <div className={cn("flex flex-1", className)}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img
                    src={imageUrl}
                    alt={name}
                    className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
                />
            </div>

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1"/>

                <p className="text-gray-400">{textDetails}</p>

                <Button className="h-[55px] w-full px-10 text-base rounded-[18px] mt-10">
                    Добавить в корзину за {totalPrice} ₴
                </Button>
            </div>
        </div>
    );
};