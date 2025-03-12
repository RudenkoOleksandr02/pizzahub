import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container, ProductForm} from "@/components/shared";

export default async function ProductPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    const product = await prisma.product.findFirst({
        where: {id: Number(id)},
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

    if (!product) notFound();

    return <Container className="flex flex-col my-10">
        <ProductForm product={product}/>
    </Container>
}