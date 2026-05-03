import ListingPage from '@/components/Listings/ListingPage'
import { Suspense } from 'react'

const page = async ({
    params
}: {
    params: Promise<{ listingId: string }>
}) => {
    const listingId = (await params).listingId
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ListingPage 
                listingId={listingId && listingId}
            />
        </Suspense>
    )
}

export default page
