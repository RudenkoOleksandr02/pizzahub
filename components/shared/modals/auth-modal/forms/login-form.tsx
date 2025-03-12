'use client'

import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {formLoginSchema, TFormLoginValues} from "@/constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormInput, Title} from "@/components/shared";
import {Button} from "@/components/ui";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false
            })

            if (!resp?.ok) throw Error();

            toast.success('Ви успішно увійшли до облікового запису');
            onClose?.();
        } catch (err) {
            console.error('Error [Login]: ', err);
            toast.error('Неможливо увійти в аккаунт')
        }
    }

    return (
        <FormProvider {...form}>
            <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title text="Вхід до облікового запису" size="md" className="font-bold"/>
                        <p className="text-gray-400">Введіть свою пошту, щоб увійти до свого облікового запису</p>
                    </div>
                    <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60}/>
                </div>

                <FormInput name="email" label="E-Mail" required />
                <FormInput name="password" label="Пароль" type="password" required />

                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                    Увійти
                </Button>
            </form>
        </FormProvider>
    );
};