import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const user = await getUserSession();

        if (!user) return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });

        const data = await prisma.user.findUnique({
            where: { id: Number(user.id) },
            select: {
                fullName: true,
                email: true,
                password: false,
            }
        });

        return NextResponse.json(data);
    } catch (err) {
        console.error('Error [USER_GET]', err);
        return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
    }
}