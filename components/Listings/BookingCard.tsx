"use client"

import { DateRange, type Range } from "react-date-range"
import { useState } from "react"
import { addDays, differenceInCalendarDays, eachDayOfInterval, format } from "date-fns"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import Button from "../ui/Button"
import { LuCheck } from "react-icons/lu"
import { authClient } from "@/lib/auth-client"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"

interface BookingCardProps {
  pricePerNight: number,
  listingId: string,
  hostId: string,
  reservations: {
    startDate: string,
    endDate: string
  }[]
}
const BookingCard = ({
  pricePerNight,
  listingId,
  hostId,
  reservations
}: BookingCardProps) => {

  const route = useRouter()

  const { data: session } = authClient.useSession()

  const [loading, setLoading] = useState<boolean>(false)

  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection"
    }
  ])

  const startDate = range[0]?.startDate

  const endDate = range[0]?.endDate

  const nights = startDate && endDate ? Math.max(differenceInCalendarDays(endDate, startDate), 1) : 0

  const total = nights * pricePerNight

  const disabledDates = reservations.flatMap(reservation => eachDayOfInterval({
    start: new Date(reservation.startDate),
    end: new Date(reservation.endDate)
  }))

  const isDisabledHost = session?.user?.id === hostId

  const onReserve = async () => {
    if (!startDate || !endDate) return

    if (!session) {
      toast.error("You must be logged in to make a reservation")
      return
    }

    // alert(`Reserving from ${format(startDate, "MMM d, yyyy")} to ${format(endDate, "MMM d, yyyy")} for a total of $${total}`)

    try {
      setLoading(true)
      await axios.post("/api/reservations", {
        startDate,
        endDate,
        listingId,
        totalPrice: total,
      })
      toast.success("Reservation successful!")
      route.refresh()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lg:sticky lg:top-8">
      <div className="border border-gray-200 rounded-2xl p-2 sm:p-8 shadow-xl bg-white">
        {/* price */}
        <div className="flex items-center gap-2 mb-6">
          <p className="text-xl font-bold">
            ${pricePerNight}
            <span className="text-lg text-gray-600">night</span>
          </p>
        </div>
        {/* calendar */}
        <div className="overflow-auto bg-white no-scrollbar">
          <DateRange
            ranges={range}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            months={1}
            direction="horizontal"
            minDate={new Date()}
            showDateDisplay={false}
            rangeColors={["#ff5a5f"]}
            disabledDates={disabledDates}
          />
        </div>

        {/* selected dates */}
        <div className="border border-gray-300 rounded-xl overflow-hidden mt-4 mb-6">
          <div className="grid grid-cols-2">
            {/* check-in */}
            <div className="p-4">
              <p className="text-xs font-bold uppercase">
                Check-in
              </p>
              <p className="font-semibold">
                {startDate ? format(startDate, "MMM d,yyy") : "-"}
              </p>
            </div>
            {/* check-out */}
            <div className="p-4">
              <p className="text-xs font-bold uppercase">
                Check-out
              </p>
              <p className="font-semibold">
                {endDate ? format(endDate, "MMM d,yyy") : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* pricing */}
        <div className="space-y-3 mb-3">
          <div className="flex justify-between text-gray-600">
            {/* price per night */}
            <span>
              ${pricePerNight} x {nights}
            </span>
            {/* total price */}
            <span>
              ${total}
            </span>
          </div>

          {/* total price */}
          <div className="border-t pt-4 justify-between font-bold text-lg">
            <span>Total </span>
            <span>${total}</span>
          </div>
        </div>

        {/* reservation btn */}
        <Button
          rounded
          onClick={onReserve}
          loading={loading}
          disabled={isDisabledHost || loading}
        >
          Reserve
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          <LuCheck className="inline mr-1 text-green-500" />
          You will not be charged yet
        </p>
      </div>
    </div>
  )
}

export default BookingCard
