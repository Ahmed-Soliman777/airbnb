import clsx from 'clsx';
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface BaseProps {
    label: string;
    error?: string;
    as?: "input" | "textarea";
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

// We can extend the BaseProps with the standard input attributes
type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>
type TextAreaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>

const Input = ({
    label,
    error,
    name,
    value,
    as = 'input',
    className,
    onChange,
    ...props
}: InputProps | TextAreaProps) => {

    // validate value
    const hasValue = value !== "" && value !== null && value !== undefined

    // shared classes for both input and textarea
    const sharedClasses = clsx(
        `
        peer
        w-full
        border
        bg-white
        focus:border-2
        px-4
        text-sm
        outline-none
        transition
        disabled:opacity-70
        text-gray-500
        `,
        error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-400 focus:border-black",
        as === "textarea"
            ? "min-h-[120px] pt-6 pb-3 rounded-xl resize-none"
            : "h-14 pt-6 rounded-xl",
        className
    )
    return (
        <div className='w-full'>
            <div className="relative">
                {
                    // render input or textarea based on the 'as' prop
                    as === "textarea" ? (
                        <textarea
                            className={sharedClasses}
                            name={name}
                            value={value}
                            placeholder=' '
                            onChange={onChange}
                            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                        />
                    ) : (
                        <input
                            className={sharedClasses}
                            name={name}
                            value={value}
                            placeholder=' '
                            onChange={onChange}
                            {...(props as InputHTMLAttributes<HTMLInputElement>)}
                        />
                    )
                }

                {/* label with animation */}
                <label
                    htmlFor={name}
                    className={
                        clsx(
                            `
                            absolute
                            left-4
                            top-4
                            text-gray-500
                            text-sm
                            transition-all
                            duration-200
                            pointer-events-none
                            origin-left
                            `,
                            hasValue
                                ? 'scale-75 -translate-y-3 text-gray-700'
                                : 'peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gray-700'
                        )
                    }
                >
                    {label}
                </label>
            </div>
            {
                // error message
                error && <p className="mt-1 text-xs text-red-500">
                    {error}
                </p>
            }
        </div>
    )
}

export default Input
