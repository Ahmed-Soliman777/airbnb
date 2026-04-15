import Image from "next/image"
import { LuHeart } from "react-icons/lu"

interface Listing {
    id: number,
    title: string,
    location: string,
    image: string,
    price: number
}

const ListingCard = ({ listing }: { listing: Listing }) => {
    return (
        <div className="group cursor-pointer">
            {/* Listing image */}
            <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                />  

                <button className="absolute top-3 right-3 p-2 rouneded-full bg-white/90 hover:bg-white shadow">
                    <LuHeart
                        size={18}
                        className="text-gray-700"
                    />
                </button>
            </div>

            <div className="space-y-1 mt-3 text-sm">
                <p className="text-gray-500 font-medium">
                    {listing.location}
                </p>
                <p className="text-gray-900 truncate">
                    {listing.title}
                </p>
                <p className="pt-1">
                    <span className="font-semibold text-gray-900">
                        ${listing.price}
                    </span> /
                    <span className="text-gray-500">
                        night
                    </span>
                </p>
            </div>
        </div>
    )
}

export default ListingCard
