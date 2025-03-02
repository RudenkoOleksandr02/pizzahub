import {z} from 'zod';

// Определение схемы валидации для формы оформления заказа
export const checkoutFormSchema = z.object({
    firstName: z.string().min(2, {message: 'Имя должно соделжать не менее 2-х символов'}),
    lastName: z.string().min(2, {message: 'Фамилия должна соделжать не менее 2-х символов'}),
    email: z.string().email({message: 'Введите корректную почту'}),
    phone: z.string().min(10, {message: 'Введите корректный номер телефона'}),
    address: z.string().min(5, {message: 'Введите корректный адрес'}),
    comment: z.string().optional() // Поле не является обязательным
});

// Генерация типа на основе схемы
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>