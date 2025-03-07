import {getServerSession} from "next-auth";
import {authOptions} from "@/constants/auth-options";

// Проверяет на уровне сервера, зарегистрирован ли пользователь и возвращаю пользователя
// Реэкспортировать нельзя
export const getUserSession = async () => {
    const session = await getServerSession(authOptions);

    return session?.user ?? null;
}