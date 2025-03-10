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
    const pizzaTypes = params.selectedPizzaTypes?.split(',').map(Number);
    const sizes = params.selectedSizes?.split(',').map(Number);
    const ingredientsIdArr = params.selectedIngredients?.split(',').map(Number);

    const minPrice = Number(params.from) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.to) || DEFAULT_MAX_PRICE;

    return prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: 'desc'
                },
                where: {
                    ingredients: ingredientsIdArr
                        ? { some: { id: { in: ingredientsIdArr } } }
                        : undefined,
                    items: {
                        some: {
                            size: { in: sizes },
                            pizzaType: { in: pizzaTypes },
                            price: {
                                gte: minPrice,
                                lte: maxPrice
                            }
                        }
                    }
                },
                include: {
                    ingredients: true,
                    items: {
                        orderBy: { price: 'asc' },
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
