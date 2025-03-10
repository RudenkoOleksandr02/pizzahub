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
    return {productId, price: randomNumber(95, 500), pizzaType, size,} as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
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

    await prisma.category.createMany({
        data: categories
    });
    await prisma.ingredient.createMany({
        data: ingredients
    });
    await prisma.product.createMany({
        data: products
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Подвійне курча',
            imageUrl:
                'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598156/ForNextPizza/ag4zypvcwgwmrciqxtwp.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });
    const pizza2 = await prisma.product.create({
        data: {
            name: 'Шинка та гриби',
            imageUrl:
                'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598156/ForNextPizza/so8avmeso2xfc34rkjzn.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });
    const pizza3 = await prisma.product.create({
        data: {
            name: 'Сирна',
            imageUrl:
                'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598156/ForNextPizza/wcytzrudsew7on01mx9j.avif',
            categoryId: 1,
            ingredients: {
                    connect: ingredients.slice(10, 18),
            },
        },
    });
    const pizza4 = await prisma.product.create({
        data: {
            name: 'Шинка та сир',
            imageUrl:
                'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598156/ForNextPizza/rpkk9kzzpsuisnm55ief.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });
    const pizza5 = await prisma.product.create({
        data: {
            name: 'М\'ясний мікс з яловичиною та ковбасками',
            imageUrl:
                'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598157/ForNextPizza/juabdhdcp1mxk5g0ldg7.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });
    const pizza6 = await prisma.product.create({
        data: {
            name: 'Креветки із солодким чилі',
            imageUrl:
                'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598157/ForNextPizza/fzcgijwzxeanchx7cjh8.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 18),
            },
        },
    });
    const pizza7 = await prisma.product.create({
        data: {
            name: 'Пепероні фреш',
            imageUrl:
                'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598157/ForNextPizza/amui0vmdsik4xvlfpazg.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });
    const pizza8 = await prisma.product.create({
        data: {
            name: 'Жюльєн',
            imageUrl:
                'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598157/ForNextPizza/zh91b5rv5gupsm3wzyae.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });
    const pizza9 = await prisma.product.create({
        data: {
            name: 'Чорізо фреш',
            imageUrl:
                'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598157/ForNextPizza/otpothkf5nwu7mmnx4be.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 18),
            },
        },
    });
    const pizza10 = await prisma.product.create({
        data: {
            name: 'М\'ясна',
            imageUrl:
                'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598157/ForNextPizza/fp1zv15fbjkbqisr1tvw.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });
    const pizza11 = await prisma.product.create({
        data: {
            name: 'Бургер-піца',
            imageUrl:
                'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598157/ForNextPizza/bogvsxkhqdmkmhos9rbt.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });
    const pizza12 = await prisma.product.create({
        data: {
            name: 'Бефстроганів',
            imageUrl:
                'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598158/ForNextPizza/jnrgiwq1cqpw7cfph6ya.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 18),
            },
        },
    });

    await prisma.productItem.createMany({
        data: [
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
            generateProductItem({productId: 17}),
            generateProductItem({productId: 18}),
            generateProductItem({productId: 19}),
            generateProductItem({productId: 20}),
            generateProductItem({productId: 21}),
            generateProductItem({productId: 22}),
            generateProductItem({productId: 23}),
            generateProductItem({productId: 24}),

            generateProductItem({productId: pizza1.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza1.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza1.id, pizzaType: 2, size: 40}),

            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 30}),
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 40}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 20}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 40}),

            generateProductItem({productId: pizza3.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza3.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza3.id, pizzaType: 2, size: 40}),

            generateProductItem({productId: pizza4.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza4.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza4.id, pizzaType: 2, size: 40}),

            generateProductItem({productId: pizza5.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza5.id, pizzaType: 1, size: 30}),
            generateProductItem({productId: pizza5.id, pizzaType: 1, size: 40}),
            generateProductItem({productId: pizza5.id, pizzaType: 2, size: 20}),
            generateProductItem({productId: pizza5.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza5.id, pizzaType: 2, size: 40}),

            generateProductItem({productId: pizza6.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza6.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza6.id, pizzaType: 2, size: 40}),

            generateProductItem({productId: pizza7.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza7.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza7.id, pizzaType: 2, size: 40}),

            generateProductItem({productId: pizza8.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza8.id, pizzaType: 1, size: 30}),
            generateProductItem({productId: pizza8.id, pizzaType: 1, size: 40}),
            generateProductItem({productId: pizza8.id, pizzaType: 2, size: 20}),
            generateProductItem({productId: pizza8.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza8.id, pizzaType: 2, size: 40}),

            generateProductItem({productId: pizza9.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza9.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza9.id, pizzaType: 2, size: 40}),

            generateProductItem({productId: pizza10.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza10.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza10.id, pizzaType: 2, size: 40}),

            generateProductItem({productId: pizza11.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza11.id, pizzaType: 1, size: 30}),
            generateProductItem({productId: pizza11.id, pizzaType: 1, size: 40}),
            generateProductItem({productId: pizza11.id, pizzaType: 2, size: 20}),
            generateProductItem({productId: pizza11.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza11.id, pizzaType: 2, size: 40}),

            generateProductItem({productId: pizza12.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza12.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza12.id, pizzaType: 2, size: 40}),
        ]
    });

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
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609111/ForNextPizza/stories/xnk3qkhc8v6hejxpvnr6.webp',
            },
            {
                previewImageUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609110/ForNextPizza/stories/uubjgalusfdigk8boqgw.webp',
            },
            {
                previewImageUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609109/ForNextPizza/stories/jfokhvsrwl3skknzzwwm.webp',
            },
            {
                previewImageUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609109/ForNextPizza/stories/zmbn3cbkzasbhcr0upi7.webp',
            },
            {
                previewImageUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609109/ForNextPizza/stories/umegahvdust2lm3wzthe.webp',
            },
            {
                previewImageUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609109/ForNextPizza/stories/h2uugdaymalmfc8uigko.webp',
            },
        ],
    });

    await prisma.storyItem.createMany({
        data: [
            {
                storyId: 1,
                sourceUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609798/ForNextPizza/stories/items/jtbtksequxenqgp2vmgd.webp',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609798/ForNextPizza/stories/items/xefo5bacvhl1jruonwsv.webp',
            },
            {
                storyId: 2,
                sourceUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609799/ForNextPizza/stories/items/mqyvpkqdne70dmftitgi.webp',
            },
            {
                storyId: 2,
                sourceUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609801/ForNextPizza/stories/items/jki8qzehw4scsuid1oxi.webp',
            },
            {
                storyId: 3,
                sourceUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609801/ForNextPizza/stories/items/vevfpfdeba9eup5m66s2.webp',
            },
            {
                storyId: 3,
                sourceUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609802/ForNextPizza/stories/items/a4clg168fwjur8akg1sq.webp',
            },
            {
                storyId: 4,
                sourceUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609803/ForNextPizza/stories/items/zkrzkx2pe0qqhhvyf5lp.webp',
            },
            {
                storyId: 4,
                sourceUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609803/ForNextPizza/stories/items/bwrilp475y9ri5dgtu3r.webp',
            },
            {
                storyId: 5,
                sourceUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609804/ForNextPizza/stories/items/dwxciowokmbkkuihsolh.webp',
            },
            {
                storyId: 5,
                sourceUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609805/ForNextPizza/stories/items/ucmgpax13qqajdwowxqk.webp',
            },
            {
                storyId: 6,
                sourceUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609800/ForNextPizza/stories/items/tprnwavjox5fzyhgqlwm.webp',
            },
            {
                storyId: 6,
                sourceUrl:
                    'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741609799/ForNextPizza/stories/items/fojspxqo2flxaq1toabi.webp',
            },
        ],
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });