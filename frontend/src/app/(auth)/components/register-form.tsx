'use client'

import { useAuth } from '@/hooks/auth'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema, type RegisterFormData } from "../schemas"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MdEmail, MdLock, MdPerson } from "react-icons/md"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import { cn } from "@/lib/utils"
import { PasswordStrength } from "./password-strength"


export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [errors, setErrors] = useState<Record<string, string[]>>({})

    const { register: registerAuth } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard'
    })

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            remember: false
        },
        mode: "onChange"
    })

    const onSubmit = async (data: RegisterFormData) => {
        setIsPending(true)
        try {
            await registerAuth({
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
                setErrors,
            })
        } catch (error) {
            console.error('Erreur d\'inscription:', error)
        } finally {
            setIsPending(false)
        }
    }

    const password = form.watch("password")

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-medium">S&apos;inscrire</CardTitle>
                <CardDescription>
                    Créez votre compte pour accéder à votre compte
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <div className="relative">
                            <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                {...form.register('name')}
                                id="name"
                                type="text"
                                className="pl-10"
                                placeholder="Nom"
                                aria-describedby={form.formState.errors.name ? "name-error" : undefined}
                            />
                        </div>
                        {form.formState.errors.name && (
                            <p id="name-error" className="text-sm text-destructive">
                                {form.formState.errors.name.message}
                            </p>
                        )}
                    </div>

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

                    <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <div className="relative">
                            <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                {...form.register('password')}
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className={cn(
                                    "pl-10 pr-10",
                                    form.formState.errors.password ? "border-destructive" : "",
                                    form.formState.dirtyFields.password && !form.formState.errors.password ? "border-primary" : ""
                                )}
                                aria-invalid={form.formState.errors.password ? "true" : "false"}
                                aria-describedby={form.formState.errors.password ? "password-error password-requirements" : "password-requirements"}
                            />
                            <div id="password-requirements" className="sr-only">
                                Le mot de passe doit contenir au moins 6 caractères, une majuscule et un chiffre
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
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
                        {password && <PasswordStrength password={password} />}
                        {form.formState.errors.password && (
                            <p id="password-error" className="text-sm text-destructive">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
                        <div className="relative">
                            <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                {...form.register('password_confirmation')}
                                id="password_confirmation"
                                type={showPassword ? "text" : "password"}
                                className="pl-10 pr-10"
                                aria-describedby={form.formState.errors.password_confirmation ? "password-confirmation-error" : undefined}
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

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={form.watch('remember')}
                                onCheckedChange={(checked) => {
                                    const boolValue = checked === true
                                    form.setValue('remember', boolValue, {
                                        shouldDirty: true,
                                        shouldTouch: true,
                                        shouldValidate: true
                                    })
                                }}
                                aria-label="Se souvenir de moi"
                            />
                            <Label
                                htmlFor="remember"
                                className="text-sm font-normal"
                            >
                                Se souvenir de moi
                            </Label>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? "Inscription en cours..." : "S'inscrire"}
                    </Button>
                    {Object.keys(errors).length > 0 && (
                        <p className="text-center text-sm text-destructive">
                            {errors.email}
                        </p>
                    )}
                    <p className="text-center text-sm text-muted-foreground">
                        Vous avez déjà un compte ?{" "}
                        <Link
                            href="/login"
                            className="text-primary hover:underline"
                        >
                            Se connecter
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}