"use client"
import useCounteries from "@/hooks/useCounteries"
import Image from "next/image"
import HeartButton from "../Favorites/HeartButton"
import { useRouter } from "next/navigation"
import { Listing } from "@/types/listing"
import { format } from "date-fns"
import CancelReservationButton from "../Reservations/CancelReservationButton"

interface ListingCardProps {
    listing: Listing,
    currentUser?: {
        id: string,
        favoriteIds: string[]
    } | null

    hideFavoriteButton?: boolean,
    property?: boolean
    reservation?: {
        id: string,
        startDate: string,
        endDate: string,
        totalPrice: number
    }

    trip?: boolean
    actionLabel?: string
}

const ListingCard = ({ listing, currentUser, hideFavoriteButton, property, reservation, trip, actionLabel }: ListingCardProps) => {
    const { getByValue } = useCounteries()
    const location = getByValue(listing.locationValue)
    const router = useRouter()
    return (
        <div
            className="group cursor-pointer"
            onClick={() => router.push(`/listings/${listing.id}`)}
        >
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

                {
                    reservation ?
                        (<>
                            <p className="text-gray-500 text-sm">
                                {format(new Date(reservation.startDate), "MMM d")} - {" "}
                                {format(new Date(reservation.endDate), "MMM d")} - {" "}
                            </p>
                            <p className="pt-1 font-semibold text-gray-900">
                                {reservation.totalPrice}
                            </p>
                        </>)
                        : (<p className="pt-1">
                            <span className="font-semibold text-gray-900">
                                ${listing.price}
                            </span> /
                            <span className="text-gray-500">
                                night
                            </span>
                        </p>)
                }

                {
                    property && (
                        <div className="mt-3">
                            <p className="text-sm text-gray-500">
                                Listed on {new Date(listing.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    )
                }

                {
                    trip && reservation && actionLabel && (
                        <CancelReservationButton
                            actionLabel={actionLabel}
                            reservationId={reservation.id}
                        />
                    )
                }
            </div>
        </div >
    )
}

export default ListingCard
