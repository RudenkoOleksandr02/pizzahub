import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
// crypto - библиотека из NODE (скачивать не надо)
import crypto from 'crypto';
import {findOrCreateCart, updateCartTotalAmount} from "@/lib";
import {CreateCartItemValuesDTO} from "@/services/dto/cart.dto";

// Обработчик GET-запроса для получения корзины пользователя
export async function GET(req: NextRequest) {
    try {
        // Идентификатор пользователя не определён (например, пользователь не авторизован)
        const userId = undefined;
        // Извлекаем токен корзины из cookies запроса
        const token = req.cookies.get('cartToken')?.value;

        // Если токен отсутствует, возвращаем объект с пустой корзиной
        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] });
        }

        // Поиск корзины, соответствующей либо авторизованному пользователю (userId),
        // либо сессии, идентифицированной по токену
        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    { userId }, // Найти корзину по userId (если пользователь авторизован)
                    { token }   // Найти корзину по токену из cookies
                ]
            },
            include: {
                // Подключаем товары, находящиеся в корзине
                items: {
                    // Сортируем товары по дате добавления (от новых к старым)
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        // Подключаем подробную информацию о товаре, включая данные о продукте
                        productItem: {
                            include: {
                                product: true
                            }
                        },
                        // Подключаем список ингредиентов для товара, если они есть
                        ingredients: true
                    }
                }
            }
        });

        // Возвращаем найденную корзину в формате JSON
        return NextResponse.json(userCart);
    } catch (error) {
        // Логируем ошибку в консоль для отладки
        console.error('[CART-GET] Server error', error);
        return NextResponse.json({message: 'Не удалось получить корзину'}, {status: 500})
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValuesDTO;

        // если товар есть, увеличить его количество (товар с одним и тем же id, одинаковыми ингридиентами)
        const findCartItem = await prisma.cartItem.findFirst({
            // найти по
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                // каждый id ингредиента который будет у меня, связан с этим cartItem, должен соответствовать тому массиву, который передам от клиента
                ingredients: { every: { id: { in: data.ingredientsIds }}}
            }
        })

        // если товар был найден, делаю + 1
        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id
                },
                data: {
                    quantity: findCartItem.quantity + 1
                }
            });
        }

        // если товар не был найден, создаю
        if (!findCartItem) {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingredients: { connect: data.ingredientsIds?.map(id => ({ id }))}
                }
            })
        }

        const updatedUserCart = await updateCartTotalAmount(token);
        const resp = NextResponse.json(updatedUserCart);

        // если токен не найден, его нужно сохранить в cookies
        resp.cookies.set('cartToken', token, {
            maxAge: 60 * 60 * 24 * 7, // Неделя
        });

        return resp;
    } catch (error) {
        console.error('[CART-POST] Server error', error);
        return NextResponse.json({message: 'Не удалось создать корзину'}, {status: 500})
    }
}
