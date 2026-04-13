// import ListingCard from "@/components/Listings/ListingCard";
import Container from "@/layouts/Container";

export default function Home() {
  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* {Listings.map(listing => {
          return (
            <ListingCard key={listing.id}/>
          )
        })} */}
      </div>
    </Container>
  );
}
