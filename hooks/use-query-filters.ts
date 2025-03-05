import React from "react";
import {Filters} from "@/hooks/use-filters";
import {useRouter} from "next/navigation";
import qs from "qs";

export const useQueryFilters = (filters: Filters) => {
    // Ref для отслеживания первого рендера, чтобы избежать перезаписи URL при монтировании
    const isMounted = React.useRef<boolean>(false);
    const router = useRouter();

    // Обновление URL при изменении фильтров
    React.useEffect(() => {
        // Пропускаем обновление на первом рендере
        if (isMounted.current) {
            // Формируем объект параметров для строки запрос
            const params = {
                selectedIngredients: Array.from(filters.selectedIngredients),
                selectedSizes: Array.from(filters.selectedSizes),
                selectedPizzaTypes: Array.from(filters.selectedPizzaTypes),
                ...filters.price
            }
            // Преобразуем объект в строку запроса, используя запятую для разделения массивов
            const queryString = qs.stringify(params, {arrayFormat: 'comma'});
            // Обновляем URL без скролла страницы
            router.push(`?${queryString}`, {scroll: false});
        }
        // Устанавливаем флаг монтирования после первого рендера
        isMounted.current = true;
    }, [filters.selectedIngredients, filters.selectedSizes, filters.selectedPizzaTypes, filters.price]);
}