// Titre principal du fichier
// Composant de formulaire de connexion avec gestion d'état, validation et accessibilité

'use client'

import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetPasswordFormData, ResetPasswordSchema } from "../../../schemas/auth-schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MdEmail, MdLock } from "react-icons/md"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/auth"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useParams } from "next/navigation"

export function ResetPasswordForm() {

    // Hooks pour récupérer les paramètres de la requête
    const params = useParams()
    const searchParams = useSearchParams()

    // États locaux pour gérer l'affichage du mot de passe, l'état de chargement, les erreurs et le statut
    const [showPassword, setShowPassword] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [errors, setErrors] = useState<Record<string, string[]>>({})

    // Hook d'authentification personnalisé
    const { resetPassword } = useAuth({ middleware: 'guest' })

    // Configuration du formulaire avec react-hook-form et zod pour la validation
    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: '',
            password: '',
            password_confirmation: '',
            token: '',
        }
    })

    // Hook pour récupérer l'email depuis les paramètres de la requête
    useEffect(() => {
        const emailParam = searchParams.get('email')
        if (emailParam) form.setValue('email', emailParam)
    }, [searchParams, form])

    // Fonction pour mettre à jour l'état de chargement
    const updateIsPending = useCallback((isPending: boolean) => {
        setIsPending(isPending)
    }, [])

    // Fonction de soumission du formulaire
    const onSubmit = async (data: ResetPasswordFormData) => {
        const token = params.token as string
        setIsPending(true)
        setErrors({})
        try {
            await resetPassword({
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
                setErrors,
                updateIsPending,
                token: token
            })
        } catch (error) {
            console.error('Erreur de réinitialisation:', error)
        }
    }


    return (
        <Card className="w-full max-w-md">
            {/* En-tête du formulaire */}
            <CardHeader>
                <CardTitle className="text-2xl font-medium">Se connecter</CardTitle>
                <CardDescription>
                    Entrez vos identifiants pour accéder à votre compte
                </CardDescription>
            </CardHeader>

            <CardContent>
                {/* Formulaire de connexion */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Affichage des erreurs générales */}
                    {form.formState.errors.root && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                {form.formState.errors.root.message}
                            </AlertDescription>
                        </Alert>
                    )}

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
                                onChange={(e) => form.setValue('email', e.target.value)}
                                required
                                autoFocus
                                aria-describedby={errors.email ? "email-error" : undefined}
                                aria-invalid={errors.email ? "true" : "false"}
                            />
                        </div>
                        {form.formState.errors.email && (
                            <p id="email-error" className="text-sm text-destructive">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Champ Mot de passe */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <div className="relative">
                            <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                {...form.register('password')}
                                id="password"
                                value={form.watch('password')}
                                type={showPassword ? "text" : "password"}
                                className="pl-10 pr-10"
                                onChange={(e) => form.setValue('password', e.target.value)}
                                required
                                aria-describedby={errors.password ? "password-error" : undefined}
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <IoEyeOffOutline className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <IoEyeOutline className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                        {form.formState.errors.password && (
                            <p id="password-error" className="text-sm text-destructive">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Champ Confirmation du mot de passe */}
                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
                        <div className="relative">
                            <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                {...form.register('password_confirmation')}
                                id="password_confirmation"
                                value={form.watch('password_confirmation')}
                                type={showPassword ? "text" : "password"}
                                className="pl-10 pr-10"
                                onChange={(e) => form.setValue('password_confirmation', e.target.value)}
                                required
                                aria-describedby={errors.password_confirmation ? "password-confirmation-error" : undefined}
                                aria-invalid={errors.password_confirmation ? "true" : "false"}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <IoEyeOffOutline className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <IoEyeOutline className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                        {form.formState.errors.password_confirmation && (
                            <p id="password-confirmation-error" className="text-sm text-destructive">
                                {form.formState.errors.password_confirmation.message}
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

                    {/* Bouton de soumission */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connexion en cours...
                            </>
                        ) : (
                            'Se connecter'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}