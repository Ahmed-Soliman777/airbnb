import Listings from "@/components/Listings/Listings";
import { Suspense } from "react";

export interface HomeProps {
  searchParams: {
    category?: string;
    locationValue?: string;
    minPrice?: number;
    maxPrice?: number;
  }
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Listings
        searchParams={searchParams}
      />
    </Suspense>
  );
} 