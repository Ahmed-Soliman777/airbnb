import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function useCancelReservation() {
  const [loadingId, setLoadingId] = useState<null | string>(null);

  const router = useRouter();

  async function cancelReservation(reservationId: string) {
    try {
      setLoadingId(reservationId);

      await axios.delete(`/api/reservations/${reservationId}`);

      toast.success("Reservation cancelled");

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  }

  return { loadingId, cancelReservation };
}
