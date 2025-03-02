import React from "react";
import {CartStateItem, useCartStore} from "@/store";
import {CreateCartItemValuesDTO} from "@/services/dto/cart.dto";

interface ReturnProps {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
    addCartItem: (values: CreateCartItemValuesDTO) => Promise<void>;
}

export const useCart = (): ReturnProps => {
    const cartState = useCartStore(state => state);

    React.useEffect(() => {
        cartState.fetchCartItems();
    }, [cartState.fetchCartItems]);

    return cartState;
}