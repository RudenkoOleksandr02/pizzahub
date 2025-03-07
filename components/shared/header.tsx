"use client"

import React from 'react';
import {cn} from "@/lib/utils";
import {AuthModal, CartButton, Container, ProfileButton, SearchInput} from "./index";
import Image from "next/image";
import Link from 'next/link';
import toast from "react-hot-toast";
import {useRouter, useSearchParams} from "next/navigation";

interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({className, hasSearch = true, hasCart = true}) => {
    const router = useRouter();
    const [openAuthModal, setOpenAuthModal] = React.useState(false);
    const searchParams = useSearchParams();

    React.useEffect(() => {
        if (searchParams.has('paid')) {
            toast.success('Заказ успешно оплачен! Информация отправлена на почту.')
        }
        if (searchParams.has('verified')) {
            toast.success('Почта успешно подтверждена!')
        }

        setTimeout(() => {
            router.replace('/')
        }, 1000)
    }, []);

    return (
        // cn склеивает классы
        <header className={cn('border-b', className)}>
            <Container className='flex items-center justify-between py-8'>
                {/* Левая часть */}
                <Link href='/'>
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="Logo" width={35} height={35}/>
                        <div>
                            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                            <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>

                {/* Поиск */}
                {hasSearch && <div className="mx-10 flex-1">
                    <SearchInput/>
                </div>}

                {/* Правая часть */}
                <div className="flex items-center gap-3">
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>

                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>

                    {hasCart && <CartButton/>}
                </div>
            </Container>
        </header>
    );
};