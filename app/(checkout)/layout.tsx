import {Metadata} from "next";
import {ReactNode} from "react";
import {Header} from "@/components/shared";

export const metadata: Metadata = {
    title: "Next Pizza | Оформление",
    description: "Checkout",
}

export default function CheckoutLayout({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen bg-[#F4F1EE]">
            <Header className="border-b-gray-200" hasSearch={false} hasCart={false}/>
            {children}
        </main>
    )
}