import { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '@/hooks/auth'
import Loading from '@/app/dashboard/Loading'
import { User } from '../../types/user'

interface AuthContextType {
    user: User | null
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true
})

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth({ middleware: 'auth' })
    const loading = !user

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {loading ? (
                <Loading />
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
} 