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
        const isPaid = searchParams.has('paid');
        const isVerified = searchParams.has('verified');

        if (isPaid) toast.success('Замовлення успішно сплачено! Інформація надіслана на пошту.');
        if (isVerified) toast.success('Пошта успішно підтверджена! Тепер ви можете увійти до свого облікового запису.');

        if (isVerified || isPaid) {
            setTimeout(() => {
                router.replace('/')
            }, 1000);
        }
    }, []);

    return (
        <header className={cn('border-b', className)}>
            <Container className='flex items-center justify-between py-8'>
                {/* Левая часть */}
                <Link href='/'>
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="Logo" width={50} height={50}/>
                        <div>
                            <h1 className="text-2xl uppercase font-black">Pizza Hub</h1>
                            <p className="text-sm text-gray-400 leading-3">неймовірна насолода</p>
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