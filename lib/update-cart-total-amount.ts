import {prisma} from "@/prisma/prisma-client";
import {calcCartItemTotalPrice} from "@/lib/calc-cart-item-total-price";

export const updateCartTotalAmount = async (token: string) => {
    const userCart = await prisma.cart.findFirst({
        where: {
            token
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product: true
                        }
                    },
                    ingredients: true
                }
            }
        }
    });

    if (!userCart) return;

    const totalAmount = userCart.items.reduce((acc, item) => {
        return acc + calcCartItemTotalPrice(item);
    }, 0);

    return prisma.cart.update({
        where: {
            id: userCart.id // или по токену (без разницы)
        },
        // обновить общую сумму корзины
        data: {
            totalAmount
        },
        // и вернуть всю связь
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product: true
                        }
                    },
                    ingredients: true
                }
            }
        }
    });
}