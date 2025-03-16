import React from 'react';
import {FormAddressInput, FormTextarea, WhiteBlock} from "@/components/shared";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title="3. Адреса доставки" className={className}>
            <div className="flex flex-col gap-5">
                <FormAddressInput name='address' className="text-base" placeholder='Введіть адресу...'/>
                <FormTextarea name="comment" className="text-base" placeholder="Коментарі до замовлення"/>
            </div>
        </WhiteBlock>
    );
};