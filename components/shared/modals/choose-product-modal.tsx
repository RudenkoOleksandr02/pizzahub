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

    return (
        // router.back() - вернуться на предыдущий путь
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <VisuallyHidden><DialogTitle>{product.name}</DialogTitle></VisuallyHidden>
            <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>
                <ProductForm product={product} onSubmit={() => router.back()}/>
            </DialogContent>
        </Dialog>
    );
};