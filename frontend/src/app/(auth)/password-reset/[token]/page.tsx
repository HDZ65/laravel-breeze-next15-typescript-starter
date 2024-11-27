'use client'

/**
 * @title Page de réinitialisation de mot de passe
 * @description Permet aux utilisateurs de réinitialiser leur mot de passe avec un token valide
 * @accessibility 
 * - Utilisation de labels explicites
 * - Messages d'erreur associés aux champs via aria-describedby
 * - Statut de formulaire accessible
 */

import { useEffect, useState, FormEvent } from 'react'
import { useSearchParams, useParams } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import { useAuth } from '@/hooks/auth'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface FormErrors {
    email?: string[]
    password?: string[]
    password_confirmation?: string[]
    [key: string]: string[] | undefined
}

const PasswordReset = (): JSX.Element => {
    const params = useParams()
    const searchParams = useSearchParams()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
    const [errors, setErrors] = useState<FormErrors>({})
    const [status, setStatus] = useState<string | null>(null)

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const token = params.token as string

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            token,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        const emailParam = searchParams.get('email')
        if (emailParam) setEmail(emailParam)
    }, [searchParams])

    return (
        <>
            <AuthSessionStatus className="mb-4" status={status} />

            <form onSubmit={submitForm} noValidate>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                        aria-describedby={errors.email ? "email-error" : undefined}
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                        <p id="email-error" className="mt-2 text-red-600" role="alert">
                            {errors.email[0]}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-describedby={errors.password ? "password-error" : undefined}
                        aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password && (
                        <p id="password-error" className="mt-2 text-red-600" role="alert">
                            {errors.password[0]}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <Label htmlFor="passwordConfirmation">
                        Confirmer le mot de passe
                    </Label>
                    <Input
                        id="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        className="block mt-1 w-full"
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                        aria-describedby={errors.password_confirmation ? "confirmation-error" : undefined}
                        aria-invalid={errors.password_confirmation ? "true" : "false"}
                    />
                    {errors.password_confirmation && (
                        <p id="confirmation-error" className="mt-2 text-red-600" role="alert">
                            {errors.password_confirmation[0]}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button type="submit">Réinitialiser le mot de passe</Button>
                </div>
            </form>
        </>
    )
}

export default PasswordReset