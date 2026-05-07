import ReservationsPage from '@/components/Reservations/ReservationsPage'
import ListingCardSkeleton from '@/components/Skeletons/ListingCardSkeleton'
import { Suspense } from 'react'

const page = () => {
    return (
        <Suspense fallback={<ListingCardSkeleton />}>
            <ReservationsPage />
        </Suspense>
    )
}

export default page
