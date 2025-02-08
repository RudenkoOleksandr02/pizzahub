// тут функции будут вызываться по запросу /api/users

import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";

export async function GET() {
    // получить всех юзеров из prisma
    const users = await prisma.user.findMany();
    // вернуть юзеров в формате json
    return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
    const data = await req.json();

    const user = await prisma.user.create({
        data
    })

    return NextResponse.json(user)
}