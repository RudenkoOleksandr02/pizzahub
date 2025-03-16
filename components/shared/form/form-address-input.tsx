'use client'

import React, { useEffect, useRef, useState } from 'react';
import { FormInput } from "@/components/shared";
import { useFormContext } from "react-hook-form";

interface Props {
    name: string;
    placeholder?: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormAddressInput: React.FC<Props> = ({
                                                      className,
                                                      name,
                                                      placeholder,
                                                      label,
                                                      required,
                                                      ...props
                                                  }) => {
    const { watch, setValue } = useFormContext();
    const query = (watch(name) as string) || '';
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const isSelecting = useRef(false);

    useEffect(() => {
        if (query.length < 3) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        if (isSelecting.current) {
            isSelecting.current = false;
            return;
        }

        const fetchSuggestions = async () => {
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                query
            )}&format=json&addressdetails=1&limit=5&countrycodes=UA&accept-language=uk`;

            try {
                const response = await fetch(url, {
                    headers: { "User-Agent": "MyApp/1.0 (contact@example.com)" },
                });

                if (response.ok) {
                    const data = await response.json();
                    const filteredData = data.filter((item: any) =>
                        item.address?.house_number || /^\s*(\d+)\b/.test(item.display_name)
                    );

                    setSuggestions(filteredData.length > 0 ? filteredData : data);
                    setShowSuggestions(true);
                }
            } catch (error) {
                console.error('Error fetching address suggestions:', error);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (address: string) => {
        isSelecting.current = true;
        setValue(name, address, { shouldValidate: true });
        setShowSuggestions(false);
    };

    return (
        <div className={className} style={{ position: 'relative' }} tabIndex={-1}>
            <FormInput
                name={name}
                label={label}
                required={required}
                placeholder={placeholder}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                {...props}
            />

            {showSuggestions && suggestions.length > 0 && (
                <ul
                    className="absolute top-[115%] left-0 right-0 bg-white list-none p-0 m-0 max-h-[200px] rounded-md border border-input overflow-y-auto z-10"
                >
                    {suggestions.map((sugg, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onMouseDown={() => handleSelect(sugg.display_name)}
                        >
                            {sugg.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
