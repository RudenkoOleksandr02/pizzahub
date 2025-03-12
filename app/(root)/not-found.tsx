import Link from 'next/link'
import {InfoBlock} from "@/components/shared";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center mt-40">
            <InfoBlock
                title="Сторінку не знайдено"
                text="На жаль, такої сторінки не існує. Можливо, вона була видалена або переміщена."
                imageUrl="/assets/images/not-found.png"
            />
        </div>
    )
}