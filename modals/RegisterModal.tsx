'use client'
import Input from '@/components/ui/Input'
import Modal from './Modal'
import { useAuthModal } from '@/store/useAuthModalStore'
import Button from '@/components/ui/Button'
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

interface RegisterValues {
    name: string;
    email: string;
    password: string;
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>

const RegisterModal = () => {

    // next router instance
    const router = useRouter()

    // destructing the auth modal store
    const { isRegisterOpen, closeRegister, openLogin } = useAuthModal()

    // setting state for register values api
    const [values, setValues] = useState<RegisterValues>({
        name: "",
        email: "",
        password: ""
    })

    // setting state for register error
    const [error, setErrors] = useState<RegisterErrors>({})

    // setting loading state for register api response
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // destructing the input name and the value of the input
        const { name, value } = e.target

        // setting input value
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))

        // setting api errors
        setErrors((prev) => ({
            ...prev,
            [name]: undefined // intial value for error == undefined
        }))
    }

    // register input validation
    const validate = () => {

        const newErrors: RegisterErrors = {}

        // user name validation
        if (!values.name.trim) newErrors.name = "Name field is required!"

        else if (values.name.length < 2) newErrors.name = "Name must be at least 2 characters"

        // user email validation
        if (!values.email.trim) newErrors.email = "Email field is required!"

        else if (!/^\S+@\S+\.\S+$/.test(values.email)) newErrors.email = "Please enter a valid email"

        // user password validation
        if (!values.password.trim) newErrors.password = "Password field is required!"

        else if (values.password.length < 6) newErrors.password = "Password must be at least 6 characters"

        // setting new error
        setErrors(newErrors)

        // no errors
        return Object.keys(newErrors).length === 0
    }

    const onSubmit = async (e: React.FormEvent) => {

        // prevent form defaults
        e.preventDefault()

        // if there is an error return nothing
        if (!validate()) return

        // set loading to true
        setLoading(true)

        try {

            // calling register api
            const { error } = await authClient.signUp.email({
                email: values.email,
                password: values.password,
                name: values.name
            })

            // show error message
            if (error) {
                toast.error(error.message as string, {
                    style: {
                        background: "#ff5a5f",
                        color: "#fff"
                    }
                })
                return
            }

            // show success message
            toast.success("Registration successful! Please check your email to verify your account.", {
                style: {
                    background: "#4BB543",
                    color: "#fff"
                }
            })

            // reset form values
            setValues({
                name: "",
                email: "",
                password: ""
            })

            // close register modal
            closeRegister()

            // refresh the page
            router.refresh()
        } catch (error) {

            // show error message
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong, please try again.",
                {
                    style: {
                        background: "#ff5a5f",
                        color: "#fff"
                    }
                }
            )
        } finally {
            // set loading to false
            setLoading(false)
        }
    }

    return (
        <Modal
            title='Register'
            isOpen={isRegisterOpen}
            onClose={closeRegister}
        >
            {/* header */}
            <div className="mb-6 space-y-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Welcome to Airbnb
                </h2>
                <p className="text-sm text-gray-500">
                    Create an account
                </p>
            </div>

            {/* register form */}
            <form onSubmit={onSubmit} className='space-y-8'>
                <Input
                    name='name'
                    label='Name'
                    type='text'
                    value={values.name}
                    error={error.name}
                    onChange={handleChange}
                />
                <Input
                    name='email'
                    label='Email'
                    type='text'
                    value={values.email}
                    error={error.email}
                    onChange={handleChange}
                />
                <Input
                    name='password'
                    label='Password'
                    type='text'
                    value={values.password}
                    error={error.password}
                    onChange={handleChange}
                />
                <Button
                    type='submit'
                    disabled={loading}
                    loading={loading}
                >
                    Continue
                </Button>

                {/* divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className='bg-white px-4 text-gray-500'>or</span>
                    </div>
                </div>

                <Button
                    type='button'
                    variant='outline'
                    icon={
                        <FcGoogle size={22} />
                    }
                >
                    Continue with Google
                </Button>

                {/* footer */}
                <p className="text-gray-400 text-center text-sm mt-6">
                    Already have an account? {" "}
                    <span
                        onClick={openLogin}
                        className="text-primary cursor-pointer font-semibold hover:underline">
                        Login
                    </span>
                </p>
            </form>
        </Modal>
    )
}

export default RegisterModal
