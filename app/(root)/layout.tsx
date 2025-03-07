import type {Metadata} from "next";
import {Header} from "@/components/shared/header";
import {Suspense} from "react";

export const metadata: Metadata = {
    title: "Next Pizza | Главная"
};

export default function RootLayout(
    {children, modal}: Readonly<{
        children: React.ReactNode,
        modal: React.ReactNode
    }>) {
    return (
        <main className="min-h-screen">
            {/* если есть в компоненте useSearchParams(), компонент нужно обернуть в Suspense*/}
            <Suspense>
                <Header/>
            </Suspense>
            {children}
            {modal}
        </main>
    );
}
