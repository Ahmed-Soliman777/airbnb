import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const GroupLayout = async ({
    children
}: Readonly<{ children: React.ReactNode }>) => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) redirect("/")
    return (
        <>{children}</>
    )
}

export default GroupLayout
