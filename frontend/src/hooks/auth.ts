import useSWR from 'swr'
import axios from '@/services/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

// ============ Types ============

interface AuthProps {
    middleware?: 'auth' | 'guest'
    redirectIfAuthenticated?: string
}

interface AuthErrors {
    setErrors: (errors: Record<string, string[]>) => void
}

interface LoginCredentials extends AuthErrors {
    email: string
    password: string
    setStatus: (status: string | null) => void
}

interface RegisterCredentials extends AuthErrors {
    name: string
    email: string
    password: string
    password_confirmation: string
}

interface ResetPasswordCredentials extends AuthErrors {
    password: string
    password_confirmation: string
    setStatus: (status: string | null) => void
}


interface ForgotPasswordCredentials extends AuthErrors {
    email: string
    setStatus: (status: string | null) => void
}

// ============ Auth Hook ============
export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthProps = {}) => {
    const router = useRouter()
    const params = useParams()

    // ============ Data Fetching ============
    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )
    // ============ API Methods ============
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const login = async ({ setErrors, setStatus, ...props }: LoginCredentials) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const register = async ({ setErrors, ...props }: RegisterCredentials) => {
        await csrf()

        setErrors({})

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }
        router.push('/login')
    }

    const forgotPassword = async ({ setErrors, setStatus, email }: ForgotPasswordCredentials) => {
        await csrf()
        setErrors({})
        setStatus(null)
        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }: ResetPasswordCredentials) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }: { setStatus: (status: string | null) => void }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    // ============ Navigation Middleware ============
    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)

        if (middleware === 'auth' && !user?.email_verified_at)
            router.push('/verify-email')
        
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated || '/')
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    // ============ Return Values ============
    return {
        user,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        isLoading: !error && !user,
    }
}