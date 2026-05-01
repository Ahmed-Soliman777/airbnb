import { Listing } from "@/app/generated/prisma/client"
import useCounteries from "@/hooks/useCounteries"
import Image from "next/image"
import HeartButton from "../Favorites/HeartButton"

interface ListingCardProps {
    listing: Listing,
    currentUser?: {
        id: string,
        favoriteIds: string[]
    } | null

    hideFavoriteButton?: boolean,
    property?: boolean
}

const ListingCard = ({ listing, currentUser, hideFavoriteButton, property }: ListingCardProps) => {
    const { getByValue } = useCounteries()
    const location = getByValue(listing.locationValue)
    return (
        <div className="group cursor-pointer">
            {/* Listing image */}
            <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                    src={listing.imageSrc}
                    alt={listing.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                />

                {!hideFavoriteButton && (
                    <HeartButton
                        listingId={listing.id}
                        currentUser={currentUser}
                    />)}
            </div>

            <div className="space-y-1 mt-3 text-sm">
                <p className="text-gray-500 font-medium">
                    {
                        location ?
                            `${location.region}, ${location.label}`
                            :
                            listing.locationValue
                    }
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

                {property && (
                    <div className="mt-3">
                        <p className="text-sm text-gray-500">
                            Listed on {new Date(listing.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListingCard
