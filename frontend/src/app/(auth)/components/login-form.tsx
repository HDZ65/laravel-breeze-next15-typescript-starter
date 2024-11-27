// Titre principal du fichier
// Composant de formulaire de connexion avec gestion d'état, validation et accessibilité

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
import { useAuth } from "@/hooks/auth"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  // États locaux pour gérer l'affichage du mot de passe, l'état de chargement, les erreurs et le statut
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [status, setStatus] = useState<string | null>(null)
  // Hook d'authentification personnalisé
  const { login: loginAuth } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard'
  })

  // Configuration du formulaire avec react-hook-form et zod pour la validation
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  })

  // Fonction de soumission du formulaire
  const onSubmit = async (data: LoginFormData) => {
    setIsPending(true)
    setErrors({}) // Réinitialiser les erreurs à chaque tentative
    try {
      await loginAuth({
        email: data.email,
        password: data.password,
        setErrors,
        setStatus
      })
    } catch (error) {
      console.error('Erreur de connexion:', error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
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

            {/* Champ Mot de passe */}
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

            {/* Options supplémentaires */}
            <div className="flex items-center justify-between">
              {/* Case à cocher "Se souvenir de moi" */}
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
              {/* Lien "Mot de passe oublié" */}
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            
             {/* Affichage des erreurs */}
             {Object.keys(errors).length > 0 && (
              <p className="text-center text-sm  text-destructive">
                Email ou mot de passe incorrect
              </p>
            )}
            {Object.keys(errors).length === 0 && status && (
              <p className="text-center text-sm  text-success">
                Connexion réussie
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
    </>
  )
}