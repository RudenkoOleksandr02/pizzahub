import {CartStateItem} from "@/store/cart";
import {CartDTO, CartItemDTO} from "@/services/dto/cart.dto";
import {calcCartItemTotalPrice} from "@/lib/calc-cart-item-total-price";

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item: CartItemDTO): CartStateItem => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        price: calcCartItemTotalPrice(item),
        pizzaSize: item.productItem.size,
        type: item.productItem.pizzaType,
        ingredients: item.ingredients.map(ingredient => ({
            name: ingredient.name,
            price: ingredient.price
        })),
        disabled: false
    }));

    return {
        totalAmount: data.totalAmount,
        items
    }
}