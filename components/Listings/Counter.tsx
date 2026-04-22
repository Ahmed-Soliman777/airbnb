import { LuMinus, LuPlus } from "react-icons/lu";

interface CounterProps {
    title: string;
    subTitle: string;
    value: number;
    onChange: (value: number) => void
    min?: number;
    max?: number;
}
const Counter = ({
    title,
    subTitle,
    value,
    onChange,
    min = 1,
    max = 20
}: CounterProps) => {

    // create increase function for increasing action
    const increase = () => {
        if (value < max) onChange(value + 1)
    }

    // create decrease function for decreasing action
    const decrease = () => {
        if (value > min) onChange(value - 1)
    }

    // shared classes variable for same style
    const sharedClasses = "w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition"

    return (
        <div className="flex items-center justify-between py-8 border-b last:border-b-0 gap-8">
            {/* title and subtitle section */}
            <div>
                <p className="font-medium text-gray-900">
                    {title}
                </p>
                <p className="text-sm text-gray-500">
                    {subTitle}
                </p>
            </div>

            {/* buttons sections */}
            <div className="flex items-center gap-4">
                <button
                    onClick={decrease}
                    disabled={value === min}
                    className={sharedClasses}
                >
                    <LuMinus size={16} />
                </button>

                <span className="w-6 text-center font-medium text-gray-600">
                    {value}
                </span>

                <button
                    onClick={increase}
                    disabled={value === max}
                    className={sharedClasses}
                >
                    <LuPlus size={16} />
                </button>
            </div>
        </div >
    )
}

export default Counter
