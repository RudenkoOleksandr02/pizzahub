'use client'

import {
    CheckoutAddressForm,
    CheckoutCart,
    CheckoutPersonalForm,
    Container,
    Title,
    CheckoutSidebar
} from "@/components/shared";
import {useCart} from "@/hooks";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckoutFormValues, checkoutFormSchema} from "@/constants";
import {createOrder} from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";

export default function CheckoutPage() {
    const {items, totalAmount, updateItemQuantity, removeCartItem, loading} = useCart();
    const [submitting, setSubmitting] = React.useState(false);

    // Инициализация useForm с валидацией через Zod и начальными значениями
    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema), // Использование схемы валидации
        defaultValues: { // Начальные значения полей формы
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: ''
        }
    });

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);

            // Отправляем данные на сервер для создания заказа и получаем URL для оплаты
            const url = await createOrder(data);
            toast.success('Переход на оплату...');

            // Проверяем, что сервер вернул ссылку, и перенаправляем пользователя на страницу оплаты
            if (url) location.href = url;
        } catch (error) {
            console.error(error);
            setSubmitting(false);
            toast.error('Не удалось создать заказ');
        }
    }

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity)
    }

    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"/>

            {/* Провайдер формы для передачи контекста useForm в дочерние компоненты */}
            <FormProvider {...form}>
                {/* Форма с валидацией: если успешно, вызывается onSubmit */}
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        {/* Левая часть */}
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart items={items} removeCartItem={removeCartItem}
                                          onClickCountButton={onClickCountButton} loading={loading}/>
                            <CheckoutPersonalForm className={loading ? "opacity-50 pointer-events-none" : ""}/>
                            <CheckoutAddressForm className={loading ? "opacity-50 pointer-events-none" : ""}/>
                        </div>

                        {/* Правая часть */}
                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting}/>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}