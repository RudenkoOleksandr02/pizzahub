import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import crypto from 'crypto';
import {findOrCreateCart, updateCartTotalAmount} from "@/lib";
import {CreateCartItemValuesDTO} from "@/services/dto/cart.dto";

export async function GET(req: NextRequest) {
    try {
        const userId = undefined;
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    { userId },
                    { token }
                ]
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

        return NextResponse.json(userCart);
    } catch (error) {
        console.error('[CART-GET] Server error', error);
        return NextResponse.json({message: 'Не вдалося отримати кошик'}, {status: 500})
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

        const cartItems = await prisma.cartItem.findMany({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
            },
            include: {
                ingredients: true,
            },
        });

        const targetIngredientsIds = (data.ingredientsIds || []).sort();

        const findCartItem = cartItems.find((item) => {
            const itemIngredientsIds = item.ingredients.map(ing => ing.id).sort();
            return JSON.stringify(itemIngredientsIds) === JSON.stringify(targetIngredientsIds);
        });

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

        resp.cookies.set('cartToken', token, {
            maxAge: 60 * 60 * 24 * 7,
        });

        return resp;
    } catch (error) {
        console.error('[CART-POST] Server error', error);
        return NextResponse.json({message: 'Не вдалося створити кошик'}, {status: 500})
    }
}
