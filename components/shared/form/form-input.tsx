'use client'

import React from 'react';
import {ClearButton, ErrorText, RequiredSymbol} from "@/components/shared";
import { Input } from '@/components/ui';
import {useFormContext} from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: React.FC<Props> = ({className, name, label, required, ...props}) => {
    const {
        register, // Регистрация поля в useForm
        formState: {errors}, // Получение ошибок валидации
        watch, // Отслеживание изменений значения поля
        setValue // Установка нового значения поля (в моем случае используется только для очистки поля)
    } = useFormContext();

    // Следит за изменнениями
    const value = watch(name); // Текущее значение поля
    const errorText = errors[name]?.message as string; // Текст ошибки, если есть

    const onClickClear = () => {
        setValue(name, '', {shouldValidate: true}); // Очистка поля (shouldValidate: true - валидация триггерится при очистке поля)
    }

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                {/* Регистрация поля по name */}
                <Input className="h-12 text-md" {...props} {...register(name)} />

                {/* Кнопка очистки, если есть значение */}
                {value && <ClearButton onClick={onClickClear}/>}
            </div>

            {/* Отображение ошибки, если есть */}
            {errorText && <ErrorText text={errorText} className="mt-2"/>}
        </div>
    );
};