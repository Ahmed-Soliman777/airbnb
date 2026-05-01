import PropertiesPage from '@/components/Properties/PropertiesPage'
import { Suspense } from 'react'

const page = () => {
    return (
        <Suspense fallback={<p>Loading</p>}>
            <PropertiesPage />
        </Suspense>
    )
}

export default page
