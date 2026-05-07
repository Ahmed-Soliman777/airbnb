import ListingCardSkeleton from '@/components/Skeletons/ListingCardSkeleton'
import TripsPage from '@/components/trips/TripsPage'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <Suspense fallback={<ListingCardSkeleton />}>
            <TripsPage />
        </Suspense>
    )
}

export default page
