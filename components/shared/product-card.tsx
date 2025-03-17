import React from 'react';
import Link from "next/link";
import {Title} from "./index";
import {Button} from '../ui';
import {Ingredient} from "@prisma/client";
import {cn} from "@/lib/utils";

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    ingredients?: Ingredient[];
    className?: string;
}

export const ProductCard: React.FC<Props> = ({name, price, id, imageUrl, ingredients, className}) => {
    return (
        <div className={cn('flex flex-col justify-between', className)}>
            <div>
                <Link href={`/product/${id}`} scroll={false}>
                    <div className="flex justify-center items-center p-6 bg-secondary rounded-lg h-[260px]">
                        <img className="h-fit" src={imageUrl} alt={name}/>
                    </div>
                </Link>

                <Title text={name} size="sm" className="mb-1 mt-3 font-bold"/>

                <p className="text-sm text-gray-400">{ingredients?.map(ingredient => ingredient.name).join(', ')}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
                <span className="text-[20px]">
                    от <b>{price} ₴</b>
                </span>

                <Link href={`/product/${id}`} scroll={false}>
                    <Button variant="secondary" className="text-base font-bold">
                        Вибрати
                    </Button>
                </Link>
            </div>
        </div>
    );
};