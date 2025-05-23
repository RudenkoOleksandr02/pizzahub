import React from "react";
import {PizzaSize, PizzaType} from "@/constants/pizza";
import {Variant} from "@/components/shared/group-variants";
import {useSet} from "react-use";
import {getAvailablePizzaSizes} from "@/lib";
import {ProductItem} from "@prisma/client";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<number>;
    availableSizes: Variant[];
    currentItemId?: number;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    toggleIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);
    const [selectedIngredients, {toggle: toggleIngredient}] = useSet(new Set<number>([]));

    const availableSizes = getAvailablePizzaSizes(items, type);

    const currentItemId = items.find(item => item.size === size && item.pizzaType === type)?.id;

    React.useEffect(() => {
        const isAvailableSize = availableSizes.find(item => Number(item.value) === size && !item.disabled);
        const availableSize = availableSizes.find(item => !item.disabled);

        if (!isAvailableSize && availableSize) setSize(Number(availableSize.value) as PizzaSize);
    }, [type]);

    return {
        size,
        type,
        currentItemId,
        setSize,
        setType,
        selectedIngredients,
        toggleIngredient,
        availableSizes
    }
}