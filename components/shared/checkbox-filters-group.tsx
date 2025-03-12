"use client"

import React from 'react';
import {FilterCheckbox} from "./index";
import {Input, Skeleton} from '../ui';
import {FilterCheckboxProps} from "@/components/shared/filter-checkbox";

type Item = FilterCheckboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    onClickCheckbox: (id: string) => void;
    defaultValue?: string[];
    loading?: boolean;
    selected: Set<string>;
    name?: string;
    className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
                                                          className,
                                                          defaultItems,
                                                          items,
                                                          title,
                                                          searchInputPlaceholder = "Поиск...",
                                                          onClickCheckbox,
                                                          selected,
                                                          loading,
                                                          name,
                                                          limit = 5
                                                      }) => {
    const [showAll, setShowAll] = React.useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState<string>("");

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const list = showAll
        ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : (defaultItems?.slice(0, limit) || items);

    if (loading) {
        return <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {Array.from({length: limit}).map((_, index) => (
                <Skeleton key={index} className="h-6 mb-4 rounded-[8px]"/>
            ))}

            <Skeleton className={'w-[50%] h-6 mb-4 rounded-[8px]'}/>
        </div>
    }

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && <div className="mb-5">
                <Input onChange={onChangeSearchInput} value={searchValue} placeholder={searchInputPlaceholder}
                       className="bg-gray-50 border-none"/>
            </div>}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        name={name}
                        text={item.text}
                        value={item.value}
                        checked={selected.has(item.value)}
                        onCheckedChange={() => onClickCheckbox(item.value)}
                        endAdornment={item.endAdornment}
                    />))}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {showAll ? 'Приховати' : '+ Показати все'}
                    </button>
                </div>
            )}
        </div>
    );
};