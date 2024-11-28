import { z } from "zod"

// Schéma de connexion existant
export const LoginSchema = z.object({
  email: z.string()
    .email("Veuillez entrer une adresse email valide")
    .min(1, "L'email est requis"),
  password: z.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  remember: z.boolean().default(false)
})

// schéma d'inscription
export const RegisterSchema = z.object({
  name: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z.string()
    .email("Veuillez entrer une adresse email valide")
    .min(1, "L'email est requis"),
  password: z.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  password_confirmation: z.string(),
  remember: z.boolean().default(false)
}).refine((data) => data.password === data.password_confirmation, {
  message: "Les mots de passe ne correspondent pas",
  path: ["password_confirmation"],
})

// Schéma de réinitialisation de mot de passe
export const ResetPasswordSchema = z.object({
  email: z.string()
    .email("Veuillez entrer une adresse email valide"),
  token: z.string(),
  password: z.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Les mots de passe ne correspondent pas",
  path: ["password_confirmation"],
})

export type LoginFormData = z.infer<typeof LoginSchema>
export type RegisterFormData = z.infer<typeof RegisterSchema>
export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>