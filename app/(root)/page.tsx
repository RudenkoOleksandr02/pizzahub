import {Container, Filters, ProductsGroupList, Title, TopBar} from "@/components/shared";
import {Suspense} from "react";
import {findPizzas, GetSearchParams} from "@/lib/find-pizzas";

// searchParams — это объект с параметрами запроса (query-параметрами) из URL
// позволяет получать значения из строки запроса (?key=value)
export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
    const params = await searchParams;
    const categories = await findPizzas(params);
    console.log(categories);

    return <>
        <Container className="mt-10">
            <Title text="Все продукты" size="lg" className="font-extrabold"/>
        </Container>

        <TopBar categories={categories.filter(category => category.products.length > 0)}/>

        <Container className="mt-10 pb-14">
            <div className="flex gap-[80px]">

                {/* Фильтрация */}
                <div className="w-[250px]">
                    <Suspense><Filters/></Suspense>
                </div>

                {/* Список товаров */}
                <div className="flex-1">
                    <div className="flex flex-col gap-16">
                        {categories.map(category =>
                            category.products.length > 0 && (
                                <ProductsGroupList key={category.id} title={category.name} categoryId={category.id} items={category.products}/>
                            )
                        )}
                    </div>
                </div>
            </div>
        </Container>
    </>
}
