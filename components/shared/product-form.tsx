'use client'

import React from 'react';
import {ProductWithRelations} from "@/@types/prisma";
import {useCartStore} from "@/store";
import toast from "react-hot-toast";
import {ChoosePizzaForm} from "@/components/shared/choose-pizza-form";
import {ChooseProductForm} from "@/components/shared/choose-product-form";

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
    className?: string;
}

export const ProductForm: React.FC<Props> = ({product, onSubmit: _onSubmit}) => {
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);
    const {addCartItem, loading} = useCartStore(state => state);

    const onSubmit = async (productItemId?: number, ingredientsIds?: number[]) => {
        try {
            const productId = productItemId ?? firstItem.id;

            await addCartItem({
                productItemId: productId,
                ingredientsIds
            })

            toast.success('Товар добавлен в корзину');
            _onSubmit?.();
        } catch (error) {
            toast.error('Не удалось добавить товар в корзину');
            console.error(error);
        }
    }

    if (isPizzaForm) {
        return (
            <ChoosePizzaForm
                name={product.name}
                imageUrl={product.imageUrl}
                ingredients={product.ingredients}
                items={product.items}
                onSubmit={onSubmit}
                loading={loading}
            />
        )
    }

    return (
        <ChooseProductForm
            name={product.name}
            imageUrl={product.imageUrl}
            onSubmit={onSubmit}
            price={firstItem.price}
            loading={loading}
        />
    );
};