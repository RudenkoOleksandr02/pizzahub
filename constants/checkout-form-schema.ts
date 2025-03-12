import {z} from 'zod';

export const checkoutFormSchema = z.object({
    firstName: z.string().min(2, {message: 'Ім\'я повинне містити не менше 2-х символів'}),
    lastName: z.string().min(2, {message: 'Прізвище має робити не менше 2-х символів'}),
    email: z.string().email({message: 'Введіть коректну пошту'}),
    phone: z.string().min(10, {message: 'Введіть номер телефону'}),
    address: z.string().min(5, {message: 'Введіть правильну адресу'}),
    comment: z.string().optional()
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>