'use client'

import React from 'react';
import {AddressInput, ErrorText, FormTextarea, WhiteBlock} from "@/components/shared";
import {Controller, useFormContext} from "react-hook-form";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    const {control} = useFormContext();
    // Этот подход применяется, когда нужно интегрировать неуправляемые компоненты
    // (например, компоненты сторонних библиотек, таких как dadata для автозаполнения адреса)
    // с управляемыми формами в библиотеке react-hook-form.

    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <Controller
                    control={control} // Передаю control из useFormContext, чтобы интегрировать компонент с формой
                    name='address' // Указыю имя поля формы для адреса
                    render={({ field, fieldState }) => <>
                        <AddressInput onSelect={field.onChange}/> {/* Подключаю AddressInput и передаю onChange для обновления значения поля */}
                        {fieldState.error?.message && <ErrorText text={fieldState.error.message}/>} {/* Показываю ошибку, если она есть */}
                    </>}
                />
                <FormTextarea name="comment" rows={5} className="text-base" placeholder="Комментарии к заказу"/>
            </div>
        </WhiteBlock>
    );
};