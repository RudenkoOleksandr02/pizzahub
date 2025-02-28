import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container, ProductForm} from "@/components/shared";

export default async function ProductPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    // Дай первый продукт где id равен условию
    const product = await prisma.product.findFirst({
        where: {id: Number(id)},
        // для рекомендаций
        include: {
            category: {
                include: {
                    products: {
                        include: {
                            items: true
                        }
                    }
                }
            },
            items: true,
            ingredients: true
        }
    });

    // Компонент "404"
    if (!product) notFound();

    return <Container className="flex flex-col my-10">
        <ProductForm product={product}/>
    </Container>
}