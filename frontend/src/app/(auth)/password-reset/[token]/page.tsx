'use client'

import { ResetPasswordForm } from "../../components/reset-password-form";
import { useAuth } from '@/hooks/auth'

export default function Page() {

  // Spécifier explicitement le middleware guest
  useAuth({ middleware: 'guest' })
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <ResetPasswordForm />
    </div>
  )
}
