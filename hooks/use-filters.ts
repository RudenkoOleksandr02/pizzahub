import {useSearchParams} from "next/navigation";
import React from "react";
import {useSet} from "react-use";

interface PriceProps {
    from?: number;
    to?: number;
}

interface QueryFilters extends PriceProps {
    selectedPizzaTypes: string;
    selectedSizes: string;
    selectedIngredients: string;
}

export interface Filters {
    selectedIngredients: Set<string>;
    selectedSizes: Set<string>;
    selectedPizzaTypes: Set<string>;
    price: PriceProps;
}

interface ReturnProps extends Filters {
    updatePrice: (name: keyof PriceProps, value: number) => void;
    toggleIngredients: (value: string) => void;
    toggleSizes: (value: string) => void;
    togglePizzaTypes: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const [price, setPrice] = React.useState<PriceProps>({
        from: Number(searchParams.get("from")) || undefined,
        to: Number(searchParams.get("to")) || undefined,
    });

    const setSearchParam = (searchParam: keyof QueryFilters): Set<string> => (
        new Set<string>(searchParams.has(searchParam) ?  searchParams.get(searchParam)?.split(',') : [])
    )
    const [selectedIngredients, {toggle: toggleIngredients}] = useSet(setSearchParam("selectedIngredients"));
    const [selectedSizes, {toggle: toggleSizes}] = useSet(setSearchParam("selectedSizes"));
    const [selectedPizzaTypes, {toggle: togglePizzaTypes}] = useSet(setSearchParam("selectedPizzaTypes"));

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return {
        toggleIngredients,
        selectedIngredients,
        toggleSizes,
        selectedSizes,
        togglePizzaTypes,
        selectedPizzaTypes,
        updatePrice,
        price
    }
}