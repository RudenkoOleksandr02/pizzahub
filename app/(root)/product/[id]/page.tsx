import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container, GroupVariants, PizzaImage, Title} from "@/components/shared";

export default async function ProductPage({params}: {params: Promise<{ id: string }>}) {
    const {id} = await params;

    // Дай первый продукт где id равен условию
    const product = await prisma.product.findFirst({where: {id: Number(id)}});

    // Компонент "404"
    if (!product) notFound();

    return <Container className="flex flex-col my-10">
        <div className="flex">
            <PizzaImage imageUrl={product.imageUrl} size={40}/>

            <div className="w-[490px] bg-[#FCFCFC] p-7">
                <Title text={product.name} size="md" className="font-extrabold mb-1"/>

                <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>

                <GroupVariants
                    selectedValue="2"
                    items={[
                        {
                            name: 'Маленькая',
                            value: "1"
                        },
                        {
                            name: 'Средняя',
                            value: "2"
                        },
                        {
                            name: 'Большая',
                            value: "3",
                            disabled: true
                        },
                    ]}
                />
            </div>
        </div>
    </Container>
}