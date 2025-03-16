'use client';

import React from 'react';
import { PatternFormat } from "react-number-format";
import { Controller, useFormContext } from "react-hook-form";
import { ClearButton, ErrorText, RequiredSymbol } from "@/components/shared";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInputNumberFormat: React.FC<Props> = ({
                                                           className,
                                                           name,
                                                           label,
                                                           required,
                                                           placeholder
                                                       }) => {
    const { control, formState: { errors } } = useFormContext();
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <Controller
                control={control}
                name={name}
                render={({ field }) => {
                    const displayValue = field.value ? field.value.replace(/^\+38/, '') : '';

                    return (
                        <div className="relative">
                            <PatternFormat
                                className="h-12 text-md flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                id="phone"
                                format="+38 (###) ### ## ##"
                                mask="_"
                                value={displayValue}
                                onValueChange={(values) => {
                                    const { value: formattedValue } = values;
                                    field.onChange(`+38${formattedValue}`);
                                }}
                                allowEmptyFormatting={isFocused}
                                type="tel"
                                placeholder={placeholder}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => {
                                    setIsFocused(false);
                                    field.onBlur();
                                }}
                            />

                            {field.value && (
                                <ClearButton onClick={() => field.onChange('')} />
                            )}
                        </div>
                    );
                }}
            />

            {errors[name]?.message && (
                <ErrorText text={errors[name]?.message as string} className="mt-2" />
            )}
        </div>
    );
};
