// DTO (Data Transfer Object) — объект для передачи данных между клиентом и сервером
import {Cart, CartItem, Ingredient, Product, ProductItem} from "@prisma/client";

// Элемент корзины (содержит продукт и ингредиенты)
export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product;
    };
    ingredients: Ingredient[];
};

// Корзина (включает список элементов)
export interface CartDTO extends Cart {
    items: CartItemDTO[];
}

// Данные для добавления товара в корзину
export interface CreateCartItemValuesDTO {
    productItemId: number;
    ingredientsIds?: number[];
}