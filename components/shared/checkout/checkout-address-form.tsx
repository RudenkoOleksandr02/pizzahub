'use client'

import React from 'react';
import {AddressInput, ErrorText, FormTextarea, WhiteBlock} from "@/components/shared";
import {Controller, useFormContext} from "react-hook-form";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    const {control} = useFormContext();

    return (
        <WhiteBlock title="3. Адреса доставки" className={className}>
            <div className="flex flex-col gap-5">
                <Controller
                    control={control}
                    name='address'
                    render={({ field, fieldState }) => <>
                        <AddressInput onSelect={field.onChange}/>
                        {fieldState.error?.message && <ErrorText text={fieldState.error.message}/>}
                    </>}
                />
                <FormTextarea name="comment" rows={5} className="text-base" placeholder="Коментарі до замовлення"/>
            </div>
        </WhiteBlock>
    );
};