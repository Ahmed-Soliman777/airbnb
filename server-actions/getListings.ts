import prisma from "@/lib/prisma";

export async function getListings(listingId: string) {
  try {

    // get listing data
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        reservations: {
          select: {
            startDate: true,
            endDate: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!listing) return null;

    // return listing data with reservations dates
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      reservations: listing.reservations.map((reservation) => ({
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
      })),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
