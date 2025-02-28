import {create} from "zustand/react";
import {Api} from "@/services/api-client";
import {getCartDetails} from "@/lib";
import {CreateCartItemValuesDTO} from "@/services/dto/cart.dto";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disabled?: boolean;
    pizzaSize?: number | null;
    type?: number | null;
    ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    // Получить все товары
    fetchCartItems: () => Promise<void>;

    // Обновить товар
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;

    // Добавить товар
    addCartItem: (values: CreateCartItemValuesDTO) => Promise<void>;

    // Удалить товар
    removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,

    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.getCart();
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.updateItemQuantity(id, quantity);
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    removeCartItem: async (id: number) => {
        try {
            set(state => ({
                loading: true,
                error: false,
                items: state.items.map(item => item.id === id ? {...item, disabled: true} : item)
            }));
            const data = await Api.cart.removeCartItem(id);
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set(state => ({
                loading: false,
                items: state.items.map(item => item.id === id ? {...item, disabled: false} : item)
            }));
        }
    },

    addCartItem: async (value: CreateCartItemValuesDTO) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.addCartItem(value);
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    }
}));