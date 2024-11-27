'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema, type LoginFormData } from "../schemas"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MdEmail, MdLock } from "react-icons/md"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsPending(true)
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la connexion')
      }

      // Redirection après succès
      window.location.href = '/dashboard'
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : "Email ou mot de passe incorrect"
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-medium">Se connecter</CardTitle>
        <CardDescription>
          Entrez vos identifiants pour accéder à votre compte
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {form.formState.errors.root && (
            <Alert variant="destructive">
              <AlertDescription>
                {form.formState.errors.root.message}
              </AlertDescription>
            </Alert>
          )}
          
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
                className="pl-10 pr-10"
                aria-describedby={form.formState.errors.password ? "password-error" : undefined}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                name="remember"
                aria-label="Se souvenir de moi"
              />
              <Label 
                htmlFor="remember" 
                className="text-sm font-normal"
              >
                Se souvenir de moi
              </Label>
            </div>
            <Link 
              href="/forgot-password" 
              className="text-sm text-primary hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Connexion en cours..." : "Se connecter"}
          </Button>

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