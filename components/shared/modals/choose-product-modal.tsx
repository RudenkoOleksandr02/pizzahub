"use client"

import React from 'react';
import {Dialog, DialogContent, DialogTitle} from "@/components/ui";
import {cn} from "@/lib/utils";
import { useRouter } from 'next/navigation';
import {ChooseProductForm, ChoosePizzaForm} from "@/components/shared";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {ProductWithRelations} from "@/@types/prisma";
import {useCartStore} from "@/store";

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({className, product}) => {
    const router = useRouter();
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);
    const addCartItem = useCartStore(state => state.addCartItem)

    const onAddProduct = () => {
        addCartItem({
            productItemId: firstItem.id
        });
    }
    const onAddPizza = (productItemId: number, ingredientsIds: number[]) => {
        addCartItem({
            productItemId,
            ingredientsIds
        })
    }

    return (
        // router.back() - вернуться на предыдущий путь
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <VisuallyHidden><DialogTitle>{product.name}</DialogTitle></VisuallyHidden>
            <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>
                {isPizzaForm ? (
                    <ChoosePizzaForm
                        name={product.name}
                        imageUrl={product.imageUrl}
                        ingredients={product.ingredients}
                        items={product.items}
                        onSubmit={onAddPizza}
                    />
                ) : (
                    <ChooseProductForm
                        name={product.name}
                        imageUrl={product.imageUrl}
                        onSubmit={onAddProduct}
                        price={firstItem.price}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};