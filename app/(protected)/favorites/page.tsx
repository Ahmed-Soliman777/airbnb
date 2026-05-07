import FavoritesPage from "@/components/Favorites/FavoritesPage"
import ListingCardSkeleton from "@/components/Skeletons/ListingCardSkeleton"
import { Suspense } from "react"

const page = () => {
  return (
    <Suspense fallback={<ListingCardSkeleton />}>
      <FavoritesPage />
    </Suspense>
  )
}

export default page
