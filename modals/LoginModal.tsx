'use client'
import Button from '@/components/ui/Button'
import Modal from './Modal'
import { useAuthModal } from '@/store/useAuthModalStore'
import { FcGoogle } from 'react-icons/fc'
import Input from '@/components/ui/Input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import toast from 'react-hot-toast'

interface LoginValues {
    email: string;
    password: string;
}

type LoginErrors = Partial<Record<keyof LoginValues, string>>

const LoginModal = () => {

    const { isLoginOpen, closeLogin, openRegister } = useAuthModal()

    // next router instance
    const router = useRouter()

    // setting state for sign in values api
    const [values, setValues] = useState<LoginValues>({
        email: "",
        password: ""
    })

    // setting state for login error
    const [error, setErrors] = useState<LoginErrors>({})

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

        const newErrors: LoginErrors = {}

        // user email validation
        if (!values.email.trim) newErrors.email = "Email field is required!"

        // user password validation
        if (!values.password.trim) newErrors.password = "Password field is required!"

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

            // calling login api
            const { error } = await authClient.signIn.email({
                email: values.email,
                password: values.password
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
            toast.success("Login successful!", {
                style: {
                    background: "#4BB543",
                    color: "#fff"
                }
            })

            // reset form values
            setValues({
                email: "",
                password: ""
            })

            // close login modal
            closeLogin()

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
            title='Login'
            isOpen={isLoginOpen}
            onClose={closeLogin}
        >
            {/* header */}
            <div className="mb-6 space-y-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Welcome to Airbnb
                </h2>
                <p className="text-sm text-gray-500">
                    Login to account
                </p>
            </div>

            {/* login form */}
            <form
                onSubmit={onSubmit}
                className='space-y-8'>
                <Input
                    name='email'
                    label='Email'
                    type='text'
                    value={values.email}
                    onChange={handleChange}
                    error={error.email}
                />
                <Input
                    name='password'
                    label='Password'
                    type='text'
                    value={values.password}
                    onChange={handleChange}
                    error={error.password}
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
                    Do not have an account? {" "}
                    <span
                        onClick={openRegister}
                        className="text-primary cursor-pointer font-semibold hover:underline">
                        Register
                    </span>
                </p>
            </form>
        </Modal>
    )
}

export default LoginModal
