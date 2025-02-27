import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    selectedPizzaTypes?: string;
    selectedSizes?: string;
    selectedIngredients?: string;
    from?: string;
    to?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
    // Преобразуем переданные параметры в массивы чисел
    const pizzaTypes = params.selectedPizzaTypes?.split(',').map(Number);
    const sizes = params.selectedSizes?.split(',').map(Number);
    const ingredientsIdArr = params.selectedIngredients?.split(',').map(Number);

    // Задаем диапазон цен
    const minPrice = Number(params.from) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.to) || DEFAULT_MAX_PRICE;

    return prisma.category.findMany({
        include: {
            products: {
                // Сортировка продуктов: новые сначала
                orderBy: {
                    id: 'desc'
                },
                // Фильтрация продуктов по ингредиентам и параметрам items
                where: {
                    // Фильтр по ингредиентам (если заданы)
                    ingredients: ingredientsIdArr
                        ? { some: { id: { in: ingredientsIdArr } } } // хотя бы один ингредиент совпадает
                        : undefined,
                    // Фильтр по элементам продукта с нужными параметрами
                    items: {
                        some: {
                            size: { in: sizes },         // размер входит в указанные значения
                            pizzaType: { in: pizzaTypes }, // тип пиццы входит в указанные значения
                            price: {
                                gte: minPrice, // цена не ниже minPrice
                                lte: maxPrice  // цена не выше maxPrice
                            }
                        }
                    }
                },
                include: {
                    ingredients: true,
                    items: {
                        // Сортировка элементов по возрастанию цены
                        orderBy: { price: 'asc' },
                        // Фильтрация элементов по диапазону цен
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice
                            }
                        }
                    }
                }
            }
        }
    });
}
