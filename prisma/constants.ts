export const categories = [
    {
        name: 'Піци'
    },
    {
        name: 'Сніданок'
    },
    {
        name: 'Закуски'
    },
    {
        name: 'Коктейлі'
    },
    {
        name: 'Напої'
    },
];

export const ingredients = [
    {
        name: 'Сирний бортик',
        price: 90,
        imageUrl:
            'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741600994/ForNextPizza/ingredients/xedxb4r8mqx2vgnr9f29.png',
    },
    {
        name: 'Вершкова моцарела',
        price: 40,
        imageUrl:
            'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601016/ForNextPizza/ingredients/c7bmxdtajhgpf2qletrr.png',
    },
    {
        name: 'Сири чеддер і пармезан',
        price: 40,
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601024/ForNextPizza/ingredients/tym1w1vutvlu9ypdt7dd.png',
    },
    {
        name: 'Гострий перець халапеньйо',
        price: 30,
        imageUrl:
            'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601032/ForNextPizza/ingredients/bspzldm4f8p1u3vprpuf.png',
    },
    {
        name: 'Ніжний курча',
        price: 40,
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601040/ForNextPizza/ingredients/e93naqjwjiououq1yqn0.png',
    },
    {
        name: 'Шампіньйони',
        price: 30,
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601049/ForNextPizza/ingredients/kktpwf1yhxhvdgmefau4.png',
    },
    {
        name: 'Шинка',
        price: 40,
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601057/ForNextPizza/ingredients/p2zwyqpkrwcpsrnqrzyt.png',
    },
    {
        name: 'Пікантна пепероні',
        price: 40,
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601065/ForNextPizza/ingredients/spluvyvzxerig6ey65cf.png',
    },
    {
        name: 'Гостра чорізо',
        price: 40,
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601072/ForNextPizza/ingredients/zi6d3fitjl5gcoqfaeki.png',
    },
    {
        name: 'Мариновані огірочки',
        price: 30,
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601075/ForNextPizza/ingredients/ngb2dtd8ntqr9phoayeh.png',
    },
    {
        name: 'Свіжі томати',
        price: 30,
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601082/ForNextPizza/ingredients/sxzgpbby3tb4fo0vztnw.png',
    },
    {
        name: 'Червона цибуля',
        price: 30,
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601093/ForNextPizza/ingredients/z3fb704qfxgdlptzij71.png',
    },
    {
        name: 'Соковиті ананаси',
        price: 30,
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601097/ForNextPizza/ingredients/gqloyuhwtid6skn428if.png',
    },
    {
        name: 'Італійські трави',
        price: 20,
        imageUrl:
            'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601106/ForNextPizza/ingredients/iagxjlffdlzczstiwt7s.png',
    },
    {
        name: 'Солодкий перець',
        price: 30,
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601112/ForNextPizza/ingredients/ejwv6xqt2wbiwyczpi7v.png',
    },
    {
        name: 'Кубики бринзи',
        price: 40,
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601126/ForNextPizza/ingredients/llmtitru86kq8guypfmr.png',
    },
    {
        name: 'Мітболи',
        price: 40,
        imageUrl:
            'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741601129/ForNextPizza/ingredients/rrmhlpucdretiapz3ey0.png',
    }
].map((obj, index) => ({id: index + 1, ...obj}));

export const products = [
    // Сніданок
    {
        name: 'Омлет із пепероні',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598932/ForNextPizza/z7b0nqrlorv8daprop22.avif',
        categoryId: 2,
    },
    {
        name: 'Додстер із шинкою',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598932/ForNextPizza/eyrjimrjc1dfonxfh5mu.avif',
        categoryId: 2,
    },
    {
        name: 'Омлет сирний',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598933/ForNextPizza/kdiuvalg2nddomczg61b.avif',
        categoryId: 2,
    },
    {
        name: 'Омлет з шинкою та грибами',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598933/ForNextPizza/bqzqamdl4kocawdjs5tk.avif',
        categoryId: 2,
    },
    {
        name: 'Омлет із беконом',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598933/ForNextPizza/eu9xo7zt1bqpfi0gdxbo.avif',
        categoryId: 2,
    },
    {
        name: 'Сирники зі згущеним молоком',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598933/ForNextPizza/iyx23awjevw1gvqre3xn.avif',
        categoryId: 2,
    },
    {
        name: 'Сирники',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598979/ForNextPizza/zmputabsvyusl6teuolb.avif',
        categoryId: 2,
    },
    {
        name: 'Сирники з малиновим варенням',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741598981/ForNextPizza/hqyptdkkpyeqjmjmg1cg.avif',
        categoryId: 2,
    },
    // Закуски
    {
        name: 'Паста Карбонара',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599144/ForNextPizza/tjyf4pnruazhmuhge1of.avif',
        categoryId: 3,
    },
    {
        name: 'Додстер із шинкою',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599144/ForNextPizza/gpwcg7fjz5n8rzq6lfwi.avif',
        categoryId: 3,
    },
    {
        name: 'Курячі крила барбекю',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599144/ForNextPizza/hoxsnzvicyvs1wg8msdz.avif',
        categoryId: 3,
    },
    {
        name: 'Суперм\'ясний Додстер',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599144/ForNextPizza/t6wmwnzoeeib7tvvuiyg.avif',
        categoryId: 3,
    },
    {
        name: 'Додстер',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599144/ForNextPizza/idghsku5wj4nfizv4k1q.avif',
        categoryId: 3,
    },
    {
        name: 'Паста з креветками',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599145/ForNextPizza/sttjemiqbvhrypor4cas.avif',
        categoryId: 3,
    },
    {
        name: 'Курячі нагетси',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599145/ForNextPizza/tuoddesstnd1joivxnbq.avif',
        categoryId: 3,
    },
    {
        name: 'Паста Песто',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599145/ForNextPizza/lajb0a0aftd4gbode6kx.avif',
        categoryId: 3,
    },
    // Коктейлі
    {
        name: 'Банановий молочний коктейль',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599542/ForNextPizza/ehz82x63cmdrjdcblsdf.webp',
        categoryId: 4,
    },
    {
        name: 'Карамельне яблуко молочний коктейль',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599542/ForNextPizza/jgeovskmf0wukxdbmciu.webp',
        categoryId: 4,
    },
    {
        name: 'Молочний коктейль із печивом Орео',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599542/ForNextPizza/zcyaw58bcw0mxqoc7ipu.webp',
        categoryId: 4,
    },
    {
        name: 'Класичний молочний коктейль',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599542/ForNextPizza/idi05jrtewixehgzkajy.webp',
        categoryId: 4,
    },
    // Напої
    {
        name: 'Кава Карамельна капучино',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599433/ForNextPizza/xwj2xjrdzey3zl8difkb.webp',
        categoryId: 5,
    },
    {
        name: 'Кава Кокосова латте',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599433/ForNextPizza/tmzbnjqkrmc6mw3bbkcz.webp',
        categoryId: 5,
    },
    {
        name: 'Кава Американо',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599433/ForNextPizza/w95bji31fdxuvwn40kdd.webp',
        categoryId: 5,
    },
    {
        name: 'Кава Латте',
        imageUrl: 'https://res.cloudinary.com/dbie9rxsq/image/upload/v1741599433/ForNextPizza/jq0flkio6htemud6kzxv.webp',
        categoryId: 5,
    },
];