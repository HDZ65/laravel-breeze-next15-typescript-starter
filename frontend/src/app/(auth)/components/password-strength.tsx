// Nouveau composant pour la force du mot de passe
import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const requirements = [
    { re: /.{6,}/, label: "Au moins 6 caractères" },
    { re: /[A-Z]/, label: "Une lettre majuscule" },
    { re: /[0-9]/, label: "Un chiffre" },
  ]

  const strength = requirements.reduce((count, { re }) => 
    count + Number(re.test(password)), 0)

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 w-full rounded-full",
              i < strength ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
      <ul className="text-sm space-y-1">
        {requirements.map(({ re, label }, index) => (
          <li
            key={index}
            className={cn(
              "flex items-center gap-2",
              re.test(password) ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className={cn(
              "h-1.5 w-1.5 rounded-full",
              re.test(password) ? "bg-primary" : "bg-muted"
            )} />
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}