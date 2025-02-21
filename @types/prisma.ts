// у типа Product из prisma нету ingredients и Items
// по этому создаю кастомный тип

import {Ingredient, Product, ProductItem} from "@prisma/client";

export type ProductWithRelations = Product & { items: ProductItem[]; ingredients: Ingredient[] };