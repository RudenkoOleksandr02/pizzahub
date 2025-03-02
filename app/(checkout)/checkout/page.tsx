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

export default function CheckoutPage() {
    const {items, totalAmount, updateItemQuantity, removeCartItem, loading} = useCart();

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

    const onSubmit = (data: CheckoutFormValues) => {
        console.log(data)
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
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading}/>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}