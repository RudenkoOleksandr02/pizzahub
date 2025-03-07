import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { UserRole } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";

// Опции для NextAuth
export const authOptions: AuthOptions = {
    providers: [
        // Провайдер для авторизации через GitHub
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            profile(profile) {
                // Форматируем профиль пользователя, возвращаемый GitHub
                return {
                    id: profile.id,
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.image,
                    role: 'USER' as UserRole  // Устанавливаем роль пользователя по умолчанию
                }
            }
        }),
        // Провайдер для авторизации через Google
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        // Провайдер для авторизации по логину и паролю
        CredentialsProvider({
            name: 'Credentials', // Название провайдера (отображается в интерфейсе, если используется)
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            // Функция для проверки и авторизации пользователя по введенным данным
            async authorize(credentials) {
                if (!credentials) return null;

                // Определяем условия поиска пользователя по email
                const values = {
                    email: credentials.email
                };

                // Находим пользователя в базе данных
                const findUser = await prisma.user.findFirst({
                    where: values
                });

                if (!findUser) return null; // Если пользователь не найден, авторизация не проходит

                // Сравниваем введенный пароль с сохраненным хешем
                const isPasswordValid = await compare(credentials.password, findUser.password);
                if (!isPasswordValid) return null; // Если пароль неверный, возвращаем null

                if (!findUser.verified) return null; // Если пользователь не верифицирован (не активирован), авторизация не проходит

                // Возвращаем объект пользователя с нужными полями
                return {
                    id: findUser.id,
                    fullName: findUser.fullName,
                    email: findUser.email,
                    role: findUser.role
                }
            }
        })
    ],
    // Секрет для подписи JWT токенов
    secret: process.env.NEXTAUTH_SECRET,
    // Используем стратегию сессии через JWT
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        // Колбэк, вызываемый при попытке входа в систему
        async signIn({ user, account }) {
            try {
                // Для авторизации через Credentials сразу пропускаем
                if (account?.provider === "credentials") return true;

                // Для OAuth провайдеров (GitHub/Google) проверяем наличие email
                if (!user.email) return false;

                // Пытаемся найти пользователя в базе по провайдеру или email
                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { provider: account?.provider, providerId: account?.providerAccountId },
                            { email: user.email }
                        ]
                    }
                });

                if (findUser) {
                    // Если пользователь найден, обновляем данные провайдера
                    await prisma.user.update({
                        where: { id: findUser.id },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        }
                    });
                    return true;
                }

                // Если пользователь не найден, создаем нового пользователя в базе
                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullName: user.name || 'User #' + user.id,
                        // Хешируем идентификатор пользователя для создания временного пароля
                        password: hashSync(user.id.toString(), 10),
                        verified: new Date(), // Отмечаем пользователя как верифицированного
                        provider: account?.provider,
                        providerId: account?.providerAccountId
                    }
                });

                return true;
            } catch (err) {
                console.log('Error [SIGN IN]', err);
                return false;
            }
        },
        // Колбэк для формирования JWT токена
        async jwt({ token }) {
            if (!token.email) return token;
            // Ищем пользователя по email, чтобы дополнить токен
            const findUser = await prisma.user.findFirst({
                where: { email: token.email }
            });

            if (findUser) {
                // Добавляем дополнительные поля в токен
                token.id = String(findUser.id);
                token.email = findUser.email;
                token.fullName = findUser.fullName;
                token.role = findUser.role;
            }

            return token;
        },
        // Колбэк для формирования сессии из JWT токена
        session({ session, token }) {
            if (session?.user) {
                // Передаем идентификатор и роль пользователя в сессию
                session.user.id = token.id;
                session.user.role = token.role;
            }

            return session;
        }
    },
}