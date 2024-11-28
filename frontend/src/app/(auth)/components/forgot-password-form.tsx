'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/auth'
import { useCallback, useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { ResetPasswordFormData, ResetPasswordSchema } from '@/schemas/auth-schema'
import { Loader2 } from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

export default function ForgotPasswordForm() {
    // Hook d'authentification personnalisé
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [errors, setErrors] = useState<Record<string, string[]>>({})
    const [isPending, setIsPending] = useState(false)

    // Fonction pour mettre à jour l'état de chargement
    const updateIsPending = useCallback((isPending: boolean) => {
        setIsPending(isPending)
    }, [])
    // Configuration du formulaire avec react-hook-form et zod pour la validation
    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: '',
        }
    })

    const onSubmit = async (data: ResetPasswordFormData) => {
        console.log("onSubmit", new Date().toISOString());

        setIsPending(true)
        setErrors({})
        try {
            await forgotPassword({
                email: data.email,
                setErrors,
                updateIsPending
            })
            form.setError('root', {
                type: 'success',
                message: 'Un email de réinitialisation vous a été envoyé.'
            })
        } catch (error) {
            console.error('Erreur de connexion:', error)
            setIsPending(false)
        }
    }

    return (
        <Card className="w-full max-w-md">
            {/* En-tête du formulaire */}
            <CardHeader>
                <CardTitle className="text-2xl font-medium">Mot de passe oublié ?</CardTitle>
                <CardDescription>
                    Pas de problème, nous allons vous envoyer un email pour réinitialiser votre mot de passe.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {/* Formulaire de connexion */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                    {/* Champ Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                {...form.register('email')}
                                id="email"
                                type="email"
                                className="pl-10"
                                placeholder="nom@exemple.com"
                                aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                            />
                        </div>
                        {form.formState.errors.email && (
                            <p id="email-error" className="text-sm text-destructive">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>


                    {/* Affichage des messages d'erreur et de succès */}
                    {errors.message && (
                        <p
                            className="text-center text-sm text-destructive"
                            role="alert"
                        >
                            <span className="sr-only">Erreur : </span>
                            {errors.message}
                        </p>
                    )}

                    {/* Affichage des erreurs générales */}
                    {form.formState.errors.root && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                {form.formState.errors.root.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    {form.formState.errors.root?.type === 'success' && (
                        <Alert className="bg-green-50 text-green-700">
                            <AlertDescription>
                                {form.formState.errors.root.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Bouton de soumission */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Envoi du mail en cours...
                            </>
                        ) : (
                            'Envoyer le mail'
                        )}
                    </Button>



                    {/* Lien vers la page d'inscription */}
                    <p className="text-center text-sm text-muted-foreground">
                        Pas encore de compte ?{" "}
                        <Link
                            href="/register"
                            className="text-primary hover:underline"
                        >
                            S&apos;inscrire
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}