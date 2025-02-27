'use client'

import React from 'react';
import {RangeSlider, CheckboxFiltersGroup, Title} from "./index";
import {Input} from '../ui';
import {useIngredients, useFilters, useQueryFilters} from "@/hooks";


interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({className}) => {
    const {ingredients, loadingIngredients} = useIngredients();
    const items = ingredients.map(item => ({value: String(item.id), text: item.name}));

    const filters = useFilters();

    useQueryFilters(filters);

    const changeRangePrice = (price: number[]) => {
        filters.updatePrice('from', price[0]);
        filters.updatePrice('to', price[1]);
    }

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

            {/* Тип теста */}
            <CheckboxFiltersGroup
                className="mb-5"
                title="Тип теста"
                name="pizzaTypes"
                items={[
                    {text: 'Традиционное', value: '1'},
                    {text: 'Тонкое', value: '2'},
                ]}
                onClickCheckbox={filters.togglePizzaTypes}
                selected={filters.selectedPizzaTypes}
            />

            {/* Размеры */}
            <CheckboxFiltersGroup
                className="mb-5"
                title="Размеры"
                name="sizes"
                items={[
                    {text: '20 см', value: '20'},
                    {text: '30 см', value: '30'},
                    {text: '40 см', value: '40'},
                ]}
                onClickCheckbox={filters.toggleSizes}
                selected={filters.selectedSizes}
            />

            {/* Фильтр цен */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="0" min={0} max={1000} value={String(filters.price.from || 0)}
                           onChange={(e) => filters.updatePrice('from', Number(e.target.value))}/>
                    <Input type="number" min={100} max={1000} placeholder="1000" value={String(filters.price.to || 1000)}
                           onChange={(e) => filters.updatePrice('to', Number(e.target.value))}/>
                </div>

                <RangeSlider min={0} max={1000} step={10} value={[filters.price.from || 0, filters.price.to || 1000]}
                             onValueChange={changeRangePrice}/>
            </div>

            {/* Ингредиенты */}
            <CheckboxFiltersGroup
                className="mt-5"
                title="Ингредиенты"
                name="Ingredients"
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loadingIngredients}
                onClickCheckbox={filters.toggleIngredients}
                selected={filters.selectedIngredients}
            />
        </div>
    );
};