import { useCancelReservation } from "@/hooks/useCancelReservation"

interface CancelReservationButtonProps {
    reservationId: string,
    actionLabel: string
}

const CancelReservationButton = ({
    reservationId,
    actionLabel
}: CancelReservationButtonProps) => {
    const { loadingId, cancelReservation } = useCancelReservation()

    const isLoading = loadingId === reservationId

    return (
        <button
            className={`mt-3 w-full border border-gray-300 rounded-lg py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 transition disabled:opacity-50 ${isLoading ? "cursor-not-allowed" : ""}`}
            onClick={(e) => {
                e.stopPropagation()
                cancelReservation(reservationId)
            }}
            disabled={isLoading}
        >
            {
                isLoading ?
                    "Cancelling..."
                    : actionLabel
            }
        </button>
    )
}

export default CancelReservationButton
