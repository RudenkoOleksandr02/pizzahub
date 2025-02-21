import React from 'react';
import {cn} from "@/lib/utils";
import {GroupVariants, IngredientItem, PizzaImage, Title} from "@/components/shared";
import {Button} from "@/components/ui";
import {PizzaSize, PizzaType, pizzaTypes} from "@/constants/pizza";
import {Ingredient, ProductItem} from "@prisma/client";
import {getPizzaDetails} from "@/lib";
import {usePizzaOptions} from "@/hooks/use-pizza-options";

interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAddCart?: VoidFunction;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
                                                     imageUrl,
                                                     name,
                                                     ingredients,
                                                     items,
                                                     onClickAddCart,
                                                     className
                                                 }) => {
    const {
        size,
        type,
        setSize,
        setType,
        selectedIngredients,
        toggleIngredient,
        availableSizes
    } = usePizzaOptions(items);

    const {totalPrice, textDetails} = getPizzaDetails(type, size, items, ingredients, selectedIngredients);

    const handleClickAdd = () => {
        onClickAddCart?.();
    }

    return (
        <div className={cn("flex flex-1", className)}>
            <PizzaImage imageUrl={imageUrl} size={size}/>

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1"/>

                <p className="text-gray-400">{textDetails}</p>

                <div className="flex flex-col gap-4 mt-5">
                    <GroupVariants items={availableSizes} selectedValue={String(size)}
                                   onClick={value => setSize(Number(value) as PizzaSize)}/>
                    <GroupVariants items={pizzaTypes} selectedValue={String(type)}
                                   onClick={value => setType(Number(value) as PizzaType)}/>
                </div>

                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map(ingredient =>
                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                imageUrl={ingredient.imageUrl}
                                price={ingredient.price}
                                onClick={() => toggleIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        )}
                    </div>
                </div>

                <Button onClick={handleClickAdd} className="h-[55px] w-full px-10 text-base rounded-[18px] mt-10">
                    Добавить в корзину за {totalPrice} ₴
                </Button>
            </div>
        </div>
    );
};