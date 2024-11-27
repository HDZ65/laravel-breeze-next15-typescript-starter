'use client'

import { useAuth } from '@/hooks/auth'
import Loading from './Loading'


const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <main>{children}</main>
        </div>
    )
}

export default AppLayout