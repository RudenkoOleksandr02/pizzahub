import {InfoBlock} from "@/components/shared";

export default function NotProductPage() {
    return (
        <div className="flex flex-col items-center justify-center mt-40">
            <InfoBlock
                title="Кошик порожній"
                text="Додайте товари, щоб продовжити"
                imageUrl="/assets/images/empty-box.png"
            />
        </div>
    )
}