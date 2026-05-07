"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export interface useFavoriteProps {
  listingId: string;
  currentUser?: {
    id: string;
    favoriteIds: string[];
  } | null;
}

export function useFavorite({ currentUser, listingId }: useFavoriteProps) {
  const hasFavorited = currentUser?.favoriteIds.includes(listingId);

  const route = useRouter();

  const toggleFavorite = async () => {
    if (!currentUser) {
      toast.error("Please login to favorite listings");
      return;
    }
    try {
      if (hasFavorited) {
        await axios.delete(`/api/favorites/${listingId}`);
      } else {
        await axios.post(`/api/favorites/${listingId}`);
      }
      route.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return { hasFavorited, toggleFavorite };
}
