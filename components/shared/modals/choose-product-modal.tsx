"use client"

import React from 'react';
import {Dialog, DialogContent, DialogTitle} from "@/components/ui";
import {cn} from "@/lib/utils";
import {useRouter} from 'next/navigation';
import {ProductForm} from "@/components/shared";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {ProductWithRelations} from "@/@types/prisma";

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({className, product}) => {
    const router = useRouter();
    const [openModal, setOpenModal] = React.useState(Boolean(product));

    const onOpenChange = () => {
        setOpenModal(false);
        router.push('/', {scroll: false});
    }

    return (
        <Dialog open={openModal} onOpenChange={() => onOpenChange()}>
            <VisuallyHidden><DialogTitle>{product.name}</DialogTitle></VisuallyHidden>
            <DialogContent aria-describedby=""
                           className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>
                <ProductForm product={product} onSubmit={() => onOpenChange()}/>
            </DialogContent>
        </Dialog>
    );
};