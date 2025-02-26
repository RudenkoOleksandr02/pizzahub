import {CartItemDTO} from "@/services/dto/cart.dto";

// (цена продукта + сумма цен ингредиентов) умноженное на количество
export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

    return (ingredientsPrice + item.productItem.price) * item.quantity;
}