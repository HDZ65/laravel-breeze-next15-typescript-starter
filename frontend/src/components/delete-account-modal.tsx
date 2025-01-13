'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DeleteAccountSchema, type DeleteAccountFormData } from '@/schemas/auth-schema'

export default function DeleteAccountModal() {
    const { deleteAccount } = useAuth()
    const [errors, setErrors] = useState<Record<string, string[]>>({})
    const [isPending, setIsPending] = useState(false)
    const [open, setOpen] = useState(false)

    const form = useForm<DeleteAccountFormData>({
        resolver: zodResolver(DeleteAccountSchema),
        defaultValues: {
            password: '',
        }
    })

    const onSubmit = async (data: DeleteAccountFormData) => {
        setIsPending(true)
        setErrors({})
        try {
            await deleteAccount({
                password: data.password,
                setErrors,
            })
            setOpen(false)
        } catch (error) {
            console.error('Erreur lors de la suppression:', error)
        }
        setIsPending(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="destructive" 
                    className="w-full"
                    type="button"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="mr-2 h-4 w-4" />
                    Supprimer mon compte
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Supprimer mon compte</DialogTitle>
                    <DialogDescription>
                        Cette action est irréversible. Veuillez confirmer en saisissant votre mot de passe.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            {...form.register('password')}
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            aria-describedby={form.formState.errors.password ? "password-error" : undefined}
                        />
                        {form.formState.errors.password && (
                            <p id="password-error" className="text-sm text-destructive">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </div>

                    {errors.message && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                {errors.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Suppression...
                                </>
                            ) : (
                                'Confirmer la suppression'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}