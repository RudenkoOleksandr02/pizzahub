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
import {useSession} from "next-auth/react";
import {Api} from "@/services/api-client";
import {redirect} from "next/navigation";

export default function CheckoutPage() {
    const {items, totalAmount, updateItemQuantity, removeCartItem, loading} = useCart();
    const [submitting, setSubmitting] = React.useState(false);
    const {data: session} = useSession();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: ''
        }
    });

    React.useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe();
            const [firstName, lastName] = data.fullName.split(' ');

            form.setValue('firstName', firstName);
            form.setValue('lastName', lastName);
            form.setValue('email', data.email);
        }

        if (session) {
            fetchUserInfo();
        }
    }, [session]);

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);
            const url = await createOrder(data);
            toast.success('Перехід на оплату...');

            if (url) location.href = url;
        } catch (error) {
            console.error(error);
            setSubmitting(false);
            toast.error('Не вдалося створити замовлення');
        }
    }

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity)
    }

    if (!totalAmount && !loading) return redirect('/not-product');

    return (
        <Container className="mt-10">
            <Title text="Оформлення замовлення" className="font-extrabold mb-8 text-[36px]"/>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart items={items} removeCartItem={removeCartItem}
                                          onClickCountButton={onClickCountButton} loading={loading}/>
                            <CheckoutPersonalForm className={loading ? "opacity-50 pointer-events-none" : ""}/>
                            <CheckoutAddressForm className={loading ? "opacity-50 pointer-events-none" : ""}/>
                        </div>

                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting}/>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}