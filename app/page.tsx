import {Container, Filters, ProductsGroupList, Title, TopBar} from "@/components/shared";

export default function Home() {
    return <>
        <Container className="mt-10">
            <Title text="Все пиццы" size="lg" className="font-extrabold"/>
        </Container>

        <TopBar/>

        <Container className="mt-10 pb-14">
            <div className="flex gap-[80px]">

                {/* Фильтрация */}
                <div className="w-[250px]">
                    <Filters/>
                </div>

                {/* Список товаров */}
                <div className="flex-1">
                    <div className="flex flex-col gap-16">
                        <ProductsGroupList title="Пиццы" items={[
                            {
                                id: 1,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 2,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 3,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 4,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 5,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 6,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 7,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 8,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                        ]} categoryId={1}/>
                        <ProductsGroupList title="Комбо" items={[
                            {
                                id: 1,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 2,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 3,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 4,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 5,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 6,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 7,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                            {
                                id: 8,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                                price: 550,
                                items: [{price: 550}]
                            },
                        ]} categoryId={2}/>
                    </div>
                </div>
            </div>
        </Container>
    </>
}
