import {Ingredient} from "@prisma/client";
import {axiosInstance} from "@/services/instance";
import {ApiRoutes} from "@/services/constants";

export const getAll = async (): Promise<Ingredient[]> => {
    return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
}