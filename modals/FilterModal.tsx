"use client"
import { useFilterModal } from '@/store/useFilterListingModal'
import Modal from './Modal'
import { Suspense, useState } from 'react'
import useCounteries, { Country } from "@/hooks/useCounteries"
import Button from '@/components/ui/Button'
import { categories } from '@/constants/Categories'
import CategoryCard from '@/components/Listings/CategoryCard'
import CountrySelect from '@/components/Listings/CountrySelect'
import dynamic from 'next/dynamic'
import Input from '@/components/ui/Input'
import { useRouter, useSearchParams } from 'next/navigation'

const STEPS = {
    CATEGORY: 0,
    LOCATION: 1,
    PRICE: 2
}

const FilterModalComponent = () => {

    const { getByValue } = useCounteries()

    const searchParams = useSearchParams()

    const router = useRouter()

    const { isOpen, close } = useFilterModal()

    function getLocationFromParams() {
        const value = searchParams.get("locationValue")

        if (!value) {
            return null;
        }

        return getByValue(value) ?? null
    }

    // create initial state for step as category
    const [step, setStep] = useState(STEPS.CATEGORY)

    // set location state
    const [location, setLocation] = useState<Country | null>(getLocationFromParams())

    // set category state
    const [category, setCategory] = useState<string | null>(searchParams.get("category") || "")

    //set minPrice state
    const [minPrice, setMinPrice] = useState<string>(searchParams.get("minPrice") || "")

    //set maxPrice state
    const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("maxPrice") || "")

    // disable filter button
    const disableFitlerButton = !category &&
        !location &&
        !minPrice &&
        !maxPrice &&
        step === STEPS.PRICE

    // create lazy loading for map
    const MapComponent = dynamic(() => import("@/components/General/map/MapComponent"), {
        ssr: false,
        loading: () => <p className="text-center py-6">Loading map...</p>
    })

    // create title for each step
    const stepTitle = () => {
        switch (step) {
            case STEPS.CATEGORY:
                return "Select a category"
            case STEPS.LOCATION:
                return "Select a location"
            case STEPS.PRICE:
                return "Select a price range"
            default:
                return ""
        }
    }

    function onApplyFilters() {
        const params = new URLSearchParams()

        if (category) params.set("category", category)
        if (location) params.set("locationValue", location.value)
        if (minPrice) params.set("minPrice", minPrice)
        if (maxPrice) params.set("maxPrice", maxPrice)

        router.push(`/?${params.toString()}`)
        setStep(STEPS.CATEGORY)
        close()

    }

    return (
        <Modal
            title='Fitler Listings'
            isOpen={isOpen}
            onClose={close}
        >
            {/* step indicator */}
            <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                {/* step index */}
                <span>
                    Step {step + 1} of 3
                </span>
                {/* step title */}
                <span className="font-medium text-gray-700">
                    {stepTitle()}
                </span>
            </div>


            {/* Category step */}
            {
                step === STEPS.CATEGORY && (
                    <div className="grid grid-cols-2 gap-4 w-full">
                        {
                            categories.map(item => (
                                <CategoryCard
                                    icon={item.icon}
                                    label={item.label}
                                    key={item.slug}
                                    onClick={() => setCategory(item.slug)}
                                    selected={category === item.slug}
                                />
                            ))
                        }
                    </div>
                )
            }

            {/* Location step */}
            {
                step === STEPS.LOCATION && (
                    <div className="w-full space-y-2 py-6">
                        <CountrySelect
                            value={location}
                            onChange={(value) => setLocation(value)}
                        />

                        <div className="h-80 overflow-hidden border">
                            <MapComponent
                                center={location?.latlng || [51.505, -0.09]}
                            />
                        </div>
                    </div>
                )
            }

            {/* price step */}
            {
                step === STEPS.PRICE && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Input
                                type="number"
                                name="min-price"
                                label="Min Price"
                                value={minPrice}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setMinPrice(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                type="number"
                                name="max-price"
                                label="Max Price"
                                value={maxPrice}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setMaxPrice(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                )
            }
            {/* footer */}
            <div className="mt-8 flex gap-3">
                {step > STEPS.CATEGORY && (
                    <Button onClick={() => setStep((prev) => prev - 1)} variant="outline">
                        Back
                    </Button>
                )}

                <Button
                    disabled={disableFitlerButton}
                    onClick={() =>
                        step < STEPS.PRICE ? setStep((prev) => prev + 1) : onApplyFilters()
                    }
                >
                    {step === STEPS.PRICE ? "Apply Filter" : "Next"}
                </Button>
            </div>
        </Modal>
    )
}

export default function FilterModal() {
    return (
        <Suspense>
            <FilterModalComponent />
        </Suspense>
    )
}
