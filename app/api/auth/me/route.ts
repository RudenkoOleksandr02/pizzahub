import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

// нужен для корруктной работы getUserSession (костыль крч)
export const dynamic = 'force-dynamic';

// Обработчик GET-запроса для получения информации о текущем пользователе
export async function GET() {
    try {
        // Получаем сессию текущего пользователя
        const user = await getUserSession();

        // Если пользователь не авторизован, возвращаем 401 Unauthorized
        if (!user) return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });

        // Находим пользователя в базе по ID и выбираем только необходимые поля
        const data = await prisma.user.findUnique({
            where: { id: Number(user.id) },
            select: {
                fullName: true,
                email: true,
                password: false, // Не возвращаем пароль
            }
        });

        // Возвращаем данные пользователя в формате JSON
        return NextResponse.json(data);
    } catch (err) {
        console.error('Error [USER_GET]', err);
        // В случае ошибки возвращаем сообщение с кодом 500 Internal Server Error
        return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
    }
}