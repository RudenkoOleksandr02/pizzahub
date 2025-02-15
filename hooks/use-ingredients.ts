import React from "react";
import {Ingredient} from "@prisma/client";
import {Api} from "@/services/api-client";

export const useIngredients = () => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        Api.ingredients
            .getAll()
            .then(ingredients => {
                setIngredients(ingredients);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return {ingredients, loadingIngredients: loading}
}