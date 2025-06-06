import {calcTotalPizzaPrice} from "@/lib/calc-total-pizza-price";
import {mapPizzaType, PizzaSize, PizzaType} from "@/constants/pizza";
import {Ingredient, ProductItem} from "@prisma/client";

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
    const textDetails = `${size} см, ${mapPizzaType[type]} піца`;

    return {totalPrice, textDetails};
}