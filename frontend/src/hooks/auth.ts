/**
 * @fileoverview Hook d'authentification principal
 * Gère toutes les fonctionnalités d'authentification de l'application
 * @author VotreNom
 * @lastModified 2024-XX-XX
 */

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
    updateIsPending: (isPending: boolean) => void
}

interface RegisterCredentials extends AuthErrors {
    name: string
    email: string
    password: string
    password_confirmation: string
}

interface ResetPasswordCredentials extends AuthErrors {
    email: string
    password: string
    password_confirmation: string
    token: string
    updateIsPending: (isPending: boolean) => void
}


interface ForgotPasswordCredentials extends AuthErrors {
    email: string
    updateIsPending: (isPending: boolean) => void
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

    const login = async ({ setErrors, updateIsPending, ...props }: LoginCredentials) => {
        await csrf()

        setErrors({})
        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                console.log("heure: d'execution", new Date().toISOString());
                if (error.response.status !== 422) throw error

                if (error.response.data.errors) {
                    setErrors({
                        message: "Email ou mot de passe incorrect",
                        ...error.response.data.errors
                    })
                }
                updateIsPending(false)
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
        try {
            if (!error) {
                await axios.post('/logout')
            }
            await mutate(null, false)
            router.push('/login')
        } catch (err) {
            console.error('Erreur lors de la déconnexion:', err)
            router.push('/login')
        }
    }

    const forgotPassword = async ({ setErrors, updateIsPending, email }: ForgotPasswordCredentials) => {
        await csrf()
        setErrors({})
        axios
            .post('/forgot-password', { email })
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
                updateIsPending(false)
            })
        updateIsPending(false)

    }

    const resetPassword = async ({ setErrors, updateIsPending, email, password, password_confirmation }: ResetPasswordCredentials) => {
        await csrf()

        setErrors({})
        updateIsPending(true)

        axios
            .post('/reset-password', { 
                email,
                password,
                password_confirmation,
                token: params.token 
            })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
                updateIsPending(false)
            })

        updateIsPending(false)
    }

    const resendEmailVerification = ({ setStatus }: { setStatus: (status: string | null) => void }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    // ============ Navigation Middleware ============
    useEffect(() => {
        // Attendre que les données soient chargées avant d'effectuer les redirections
        if (!user && !error) return

        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)

        // Modification de la condition pour la vérification d'email
        if (
            middleware === 'auth' && 
            user && 
            !user.email_verified_at && 
            window.location.pathname !== '/verify-email'
        ) {
            router.push('/verify-email')
        }
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        ) {
            router.push(redirectIfAuthenticated || '/')
        }

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