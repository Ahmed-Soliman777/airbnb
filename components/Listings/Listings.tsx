import { HomeProps } from '@/app/page'
import { getCurrentUser } from '@/server-actions/getCurrentUser'
import { getListings } from '@/services/listings'
import { Listing } from '@/app/generated/prisma/client'
import ListingCard from './ListingCard'

const Listings = async ({ searchParams }: HomeProps) => {

    const params = searchParams

    const currentUser = await getCurrentUser()

    const listings = await getListings({
        category: params?.category,
        locationValue: params?.locationValue,
        minPrice: params?.minPrice ? Number(params?.minPrice) : undefined,
        maxPrice: params?.maxPrice ? Number(params?.maxPrice) : undefined
    })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {listings.map((listing: Listing) => {
                return (
                    <ListingCard
                        key={listing.id}
                        listing={listing}
                    />
                )
            })}
        </div>
    )
}

export default Listings
