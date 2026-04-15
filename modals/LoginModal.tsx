'use client'
import Button from '@/components/ui/Button'
import Modal from './Modal'
import { useAuthModal } from '@/store/useAuthModalStore'
import { FcGoogle } from 'react-icons/fc'
import Input from '@/components/ui/Input'

const LoginModal = () => {

    const { isLoginOpen, closeLogin, openRegister } = useAuthModal()

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
            <form className='space-y-8'>
                <Input
                    name='email'
                    label='Email'
                    type='text'
                    value=''
                    onChange={() => { }}
                />
                <Input
                    name='password'
                    label='Password'
                    type='text'
                    value=''
                    onChange={() => { }}
                />
                <Button
                    type='submit'
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
