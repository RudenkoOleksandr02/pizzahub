import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get('query') || '';

    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive' // нет чувствительности к регистру
            }
        },
        take: 5 // вернет до 5 продуктов
    })

    return NextResponse.json(products);

    // Строгое сравнение ===
    /*where: {
        name: query
    }*/

    // includes JS
    /*where: {
        name: {
            contains: query,
            mode: 'insensitive'
        }
    }*/
}