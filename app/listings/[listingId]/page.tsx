import ListingPage from '@/components/Listings/ListingPage'
import ListingViewSkeleton from '@/components/Skeletons/ListingViewSkeleton'
import { Suspense } from 'react'

const page = async ({
    params
}: {
    params: Promise<{ listingId: string }>
}) => {
    const listingId = (await params).listingId
    return (
        <Suspense fallback={<ListingViewSkeleton />}>
            <ListingPage
                listingId={listingId && listingId}
            />
        </Suspense>
    )
}

export default page
