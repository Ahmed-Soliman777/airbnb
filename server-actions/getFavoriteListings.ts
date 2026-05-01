import prisma from "@/lib/prisma";
import { getCurrentUser } from "./getCurrentUser";

export async function getFavoriteListings() {
  const currentUser = await getCurrentUser();

  // if user is not authorized return []
  if (!currentUser?.id) return [];

  // find user's favorites at db
  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: {
      favoriteIds: true,
    },
  });

  // if there is no user or favorites return []
  if (!user || user.favoriteIds.length === 0) return [];

  // return listings from db
  const listings = await prisma.listing.findMany({
    where: {
      id: {
        in: user.favoriteIds,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // return listings data to the authorized user
  return listings;
}
