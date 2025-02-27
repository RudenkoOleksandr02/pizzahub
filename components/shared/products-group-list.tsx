"use client"

import React from 'react';
import { useIntersection } from 'react-use';
import {ProductCard, Title} from './index';
import {cn} from "@/lib/utils";
import {useCategoryStore} from "@/store/category";
import {ProductWithRelations} from "@/@types/prisma";

interface Props {
    title: string;
    items: ProductWithRelations[];
    categoryId: number;
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({className, listClassName, items, title, categoryId}) => {
    const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
    const intersectionRef = React.useRef<HTMLDivElement>(null!);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    });

    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [intersection?.isIntersecting, title, categoryId, setActiveCategoryId])

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />

            <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
                {items.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}
                        ingredients={product.ingredients}
                    />
                ))}
            </div>
        </div>
    );
};