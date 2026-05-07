import PropertiesPage from '@/components/Properties/PropertiesPage'
import ListingCardSkeleton from '@/components/Skeletons/ListingCardSkeleton'
import { Suspense } from 'react'

const page = () => {
    return (
        <Suspense fallback={<ListingCardSkeleton />}>
            <PropertiesPage />
        </Suspense>
    )
}

export default page
