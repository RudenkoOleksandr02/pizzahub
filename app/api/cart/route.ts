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

        // Получаем все cartItem с заданным productItemId
        const cartItems = await prisma.cartItem.findMany({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
            },
            include: {
                ingredients: true,
            },
        });

        // Сортируем массив ингредиентов, пришедших от клиента
        const targetIngredientsIds = (data.ingredientsIds || []).sort();

        // Находим запись, у которой ингредиенты совпадают полностью (по содержимому и количеству)
        const findCartItem = cartItems.find((item) => {
            // Получаем массив id ингредиентов для данной записи и сортируем его
            const itemIngredientsIds = item.ingredients.map(ing => ing.id).sort();
            return JSON.stringify(itemIngredientsIds) === JSON.stringify(targetIngredientsIds);
        });

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
