import {Metadata} from "next";
import {ReactNode, Suspense} from "react";
import {Header} from "@/components/shared";

export const metadata: Metadata = {
    title: "Pizza Hub | Оформлення",
    description: "Checkout",
}

export default function CheckoutLayout({children}: { children: ReactNode }) {
    return (
        <main className="min-h-screen bg-[#F4F1EE]">
            <Suspense>
                <Header className="border-b-gray-200" hasSearch={false} hasCart={false}/>
            </Suspense>
            {children}
        </main>
    )
}