'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'


const Page = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState<string | null>(null)

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Vérification de l&apos;email</CardTitle>
                    <CardDescription 
                        role="alert"
                        aria-live="polite">
                        Merci de votre inscription ! Avant de commencer, pourriez-vous vérifier
                        votre adresse e-mail en cliquant sur le lien que nous venons de
                        vous envoyer ?
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {status === 'verification-link-sent' && (
                        <div 
                            className="mb-4 font-medium text-sm text-green-600"
                            role="status"
                            aria-live="polite">
                            Un nouveau lien de vérification a été envoyé à l&apos;adresse e-mail
                            que vous avez fournie lors de l&apos;inscription.
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button 
                        onClick={() => resendEmailVerification({ setStatus })}
                        aria-label="Renvoyer l'email de vérification"
                        variant="default">
                        Renvoyer l&apos;e-mail
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={logout}
                        aria-label="Se déconnecter">
                        Déconnexion
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page