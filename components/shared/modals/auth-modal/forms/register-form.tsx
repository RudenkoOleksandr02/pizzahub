'use client'

import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {Button} from "@/components/ui";
import {FormInput} from "@/components/shared";
import {formRegisterSchema, TFormRegisterValues} from "@/constants";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {registerUser} from "@/app/actions";

interface Props {
    onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({onClose}) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await registerUser({
                email: data.email,
                fullName: data.fullName,
                password: data.password
            });

            toast.error('Реєстрація успішна. Підтвердьте свою пошту', {
                icon: '✅',
            });

            onClose?.();
        } catch (error) {
            console.error(error);
            return toast.error('Користувач із вказаною електронною поштою вже зареєстрований.', {
                icon: '❌',
            });
        }
    };


    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="fullName" label="Повне ім'я" required />
                <FormInput name="password" label="Пароль" type="password" required />
                <FormInput name="confirmPassword" label="Підтвердьте пароль" type="password" required />

                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                    Зареєструватись
                </Button>
            </form>
        </FormProvider>
    );
};