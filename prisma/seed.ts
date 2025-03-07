import {prisma} from "./prisma-client";
import {hashSync} from "bcrypt";
import {categories, ingredients, products} from "./constants";
import {Prisma} from "@prisma/client";

const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({productId, pizzaType, size}: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40;
}) => {
    return {productId, price: randomNumber(190, 600), pizzaType, size,} as Prisma.ProductItemUncheckedCreateInput;
};

// Функция up – генерирует (засеивает) данные в базу данных.
async function up() {
    // Создание пользователей (один обычный пользователь и один администратор)
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User',
                email: 'user@test.com',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin',
                email: 'admin@test.com',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ]
    });

    // Создание данных на основе импортированных констант
    await prisma.category.createMany({
        data: categories
    });
    await prisma.ingredient.createMany({
        data: ingredients
    });
    await prisma.product.createMany({
        data: products
    });

    // Создание продуктов-пицц с дополнительным подключением ингредиентов
    // Пицца "Пепперони фреш"
    const pizza1 = await prisma.product.create({
        data: {
            name: 'Пепперони фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: 1,
            ingredients: {
                // Подключаем первые 5 ингредиентов
                connect: ingredients.slice(0, 5),
            },
        },
    });
    // Пицца "Сырная"
    const pizza2 = await prisma.product.create({
        data: {
            name: 'Сырная',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: 1,
            ingredients: {
                // Подключаем ингредиенты со 6-го по 10-й
                connect: ingredients.slice(5, 10),
            },
        },
    });
    // Пицца "Чоризо фреш"
    const pizza3 = await prisma.product.create({
        data: {
            name: 'Чоризо фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: 1,
            ingredients: {
                // Подключаем ингредиенты со 11-го по 40-й
                connect: ingredients.slice(10, 40),
            },
        },
    });

    // Создание множества вариантов продукта (ProductItem) для пицц и остальных продуктов
    await prisma.productItem.createMany({
        data: [
            // Пицца "Пепперони фреш"
            generateProductItem({productId: pizza1.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza1.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza1.id, pizzaType: 2, size: 40}),

            // Пицца "Сырная"
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 30}),
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 40}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 20}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 40}),

            // Пицца "Чоризо фреш"
            generateProductItem({productId: pizza3.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza3.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza3.id, pizzaType: 2, size: 40}),

            // Варианты для остальных продуктов (используем только productId, остальные поля undefined)
            generateProductItem({productId: 1}),
            generateProductItem({productId: 2}),
            generateProductItem({productId: 3}),
            generateProductItem({productId: 4}),
            generateProductItem({productId: 5}),
            generateProductItem({productId: 6}),
            generateProductItem({productId: 7}),
            generateProductItem({productId: 8}),
            generateProductItem({productId: 9}),
            generateProductItem({productId: 10}),
            generateProductItem({productId: 11}),
            generateProductItem({productId: 12}),
            generateProductItem({productId: 13}),
            generateProductItem({productId: 14}),
            generateProductItem({productId: 15}),
            generateProductItem({productId: 16}),
            generateProductItem({productId: 17})
        ]
    });

    // Создание корзин для пользователей с привязкой по userId и уникальными токенами
    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '11111'
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '22222'
            },
        ]
    });

    // Добавление элемента в корзину:
    // - Связываем с конкретным вариантом продукта (productItemId)
    // - Указываем корзину (cartId)
    // - Указываем количество товара
    // - Подключаем дополнительные ингредиенты по их id
    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{id: 1}, {id: 2}, {id: 3}]
            }
        }
    });

    await prisma.story.createMany({
        data: [
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
            },
        ],
    });

    await prisma.storyItem.createMany({
        data: [
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
            },
        ],
    });
}

// Функция down – очищает данные в базе.
// Для каждой таблицы выполняется TRUNCATE с сбросом идентификаторов и каскадным удалением.
async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

// Главная функция, которая последовательно выполняет очистку данных (down) и затем их заполнение (up)
async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

// Запуск главной функции main и корректное отключение от Prisma Client после завершения работы.
// В случае ошибки выводится сообщение об ошибке и происходит отключение с завершением процесса.
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });