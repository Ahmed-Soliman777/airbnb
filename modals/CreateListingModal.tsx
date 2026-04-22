"use client"

import { useCreateListingModal } from "@/store/useCreateModalListing"
import Modal from "./Modal"
import { useState } from "react"
import Button from "@/components/ui/Button"
import { categories } from "@/constants/Categories"
import CategoryCard from "@/components/Listings/CategoryCard"
import CountrySelect from "@/components/Listings/CountrySelect"
import { Country } from "@/hooks/useCounteries"
import dynamic from "next/dynamic"
import Counter from "@/components/Listings/Counter"
import Input from "@/components/ui/Input"
import ImageUpload from "@/components/Listings/ImageUpload"
import toast from "react-hot-toast"
import axios from 'axios'

// create listing steps
const STEPS = {
    CATEGORY: 0,
    LOCATION: 1,
    COUNTRIES: 2,
    DETAILS: 3,
    IMAGES: 4,
    PRICE: 5
}

const CreateListingModal = () => {

    const { isOpen, close } = useCreateListingModal()

    const [loading, setLoading] = useState<boolean>(false)

    // create initial state for step as category
    const [step, setStep] = useState(STEPS.CATEGORY)

    // set location state
    const [location, setLocation] = useState<Country | null>(null)

    // set category state
    const [category, setCategory] = useState<string | null>(null)

    // set guest count state
    const [guestCount, setGuestCount] = useState<number>(1)

    // set bathroom count state
    const [bathroomCount, setBathroomCount] = useState<number>(1)

    // set room count state
    const [roomCount, setRoomCount] = useState<number>(1)

    // set title state
    const [title, setTitle] = useState<string>("")

    // set description state
    const [description, setDescription] = useState<string>("")

    // set image state
    const [image, setImage] = useState<File | null>(null)

    // set preview state
    const [preview, setPreview] = useState<string | null>(null)

    // set price state
    const [price, setPrice] = useState("")

    // create lazy loading for map
    const MapComponent = dynamic(() => import("@/components/General/map/MapComponent"), {
        ssr: false,
        loading: () => <p className="text-center py-6">Loading map...</p>
    })

    // create title for each step
    const stepTitle = () => {
        switch (step) {
            case STEPS.CATEGORY:
                return "Which of these best describes your place?"
            case STEPS.LOCATION:
                return "Where is your place located?"
            case STEPS.COUNTRIES:
                return "Share some basics about your place"
            case STEPS.DETAILS:
                return "How would you describe your place?"
            case STEPS.IMAGES:
                return "Add photos of your place"
            case STEPS.PRICE:
                return "How much do you charge per night?"
            default:
                return ""
        }
    }

    const handleImageChange = (file: File) => {
        setImage(file)
        setPreview(URL.createObjectURL(file))
    }

    const createListing = async () => {
        if (!title || !description || !image || !location?.value || !category || !price) {
            toast.error("Please fill in all fields")
            return
        }

        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("description", description)
            formData.append("image", image)
            formData.append("locationValue", location.value)
            formData.append("category", category)
            formData.append("guestCount", guestCount.toString())
            formData.append("roomCount", roomCount.toString())
            formData.append("bathroomCount", bathroomCount.toString())
            formData.append("price", price)

            console.log(Object.fromEntries(formData.entries()))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={close}
            title="create a new listing"
        >

            {/* step indicator */}
            <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                {/* step index */}
                <span>
                    Step {step + 1} of 6
                </span>
                {/* step title */}
                <span className="font-medium text-gray-700">
                    {stepTitle()}
                </span>
            </div>

            {/* steps container */}
            <div className="min-h-55 flex items-center justify-center rounded-xl text-gray-400 px-6">

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

                {/* counter step */}
                {
                    step === STEPS.COUNTRIES && (
                        <div className="space-y-2">
                            {/* guests count */}
                            <Counter
                                title="Guests"
                                subTitle="How many guests can stay?"
                                value={guestCount}
                                onChange={setGuestCount}
                            />

                            {/* rooms count */}
                            <Counter
                                title="Rooms"
                                subTitle="How many rooms are available?"
                                value={roomCount}
                                onChange={setRoomCount}
                            />

                            {/* bathrooms */}
                            <Counter
                                title="Bathrooms"
                                subTitle="How many bathrooms?"
                                value={bathroomCount}
                                onChange={setBathroomCount}
                            />
                        </div>
                    )
                }

                {/* details step */}
                {
                    step === STEPS.DETAILS && (
                        <div className="space-y-10 w-full">
                            {/* title input */}
                            <Input
                                name="title"
                                label="Title"
                                value={title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setTitle(e.target.value)
                                }}
                            />

                            {/* description input */}
                            <Input
                                as="textarea"
                                name="description"
                                label="Description"
                                value={description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setDescription(e.target.value)
                                }}
                            />

                            {/* add advice for add listing */}
                            <p className="text-xs text-gray-400">
                                Short titles work best
                            </p>
                        </div>
                    )
                }

                {/* images step */}
                {
                    step === STEPS.IMAGES && (
                        <ImageUpload
                            preview={preview}
                            onChange={handleImageChange}
                        />
                    )
                }

                {/* price step */}
                {
                    step === STEPS.PRICE && (
                        <Input
                            min={10}
                            type="number"
                            name="price"
                            label="Price"
                            value={price}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPrice(e.target.value)
                            }}
                        />
                    )
                }
            </div>


            {/* footer */}
            <div className="mt-8 flex gap-3">
                {/* step > 0 */}
                {step > STEPS.CATEGORY && (
                    <Button
                        variant="outline"
                        onClick={() => setStep(prev => prev - 1)}
                    >
                        Back
                    </Button>
                )}

                <Button
                    onClick={() =>
                        step < STEPS.PRICE
                            ? setStep(prev => prev + 1)
                            : createListing()
                    }
                >
                    {
                        step < STEPS.PRICE ? "Next" : "Create Listing"
                    }
                </Button>
            </div>

        </Modal>
    )
}

export default CreateListingModal
