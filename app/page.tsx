import Listings from "@/components/Listings/Listings";

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
    <Listings 
      searchParams={searchParams}
    />
  );
} 