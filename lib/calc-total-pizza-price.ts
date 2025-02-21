import {Ingredient, ProductItem} from "@prisma/client";
import {PizzaSize, PizzaType} from "@/constants/pizza";

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param type
 * @param size
 * @param items
 * @param ingredients
 * @param selectedIngredients
 *
 * @return {number} общую стоимость 
 */

export const calcTotalPizzaPrice = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const pizzaPrice = items.find(item => item.size === size && item.pizzaType === type)?.price || 0;
    const totalIngredientsPrice = ingredients
        .filter(ingredient => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);

    return pizzaPrice + totalIngredientsPrice
}