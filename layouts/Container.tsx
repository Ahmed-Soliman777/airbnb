import React from 'react'

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='mt-18 lg:mt-24 px-4 md:px-20 py-2'>
            {children}
        </div>
    )
}

export default Container
