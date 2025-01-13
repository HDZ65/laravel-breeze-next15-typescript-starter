/**
 * @title Page d'accueil - Portfolio CMS
 * @description Page de présentation du projet CMS pour les recruteurs
 */

import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, Code, Cloud, LogIn, UserPlus, KeyRound, Mail, CheckCircle2, Clock, Github, Linkedin, Database, Braces } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* En-tête avec présentation du projet */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6" aria-label="Projet Full-Stack CMS">
          Projet Full-Stack CMS
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Une application web moderne démontrant mes compétences en développement full-stack
          à travers un CMS robuste et évolutif
        </p>
        <div className="flex gap-3 justify-center flex-wrap mb-8">
          <Badge variant="default" className="px-4 py-1 text-base flex items-center gap-2">
            <Braces className="h-4 w-4" />
            TypeScript
          </Badge>
          <Badge variant="default" className="px-4 py-1 text-base flex items-center gap-2">
            <Code className="h-4 w-4" />
            Next.js 14
          </Badge>
          <Badge variant="default" className="px-4 py-1 text-base flex items-center gap-2">
            <Code className="h-4 w-4" />
            Laravel 10
          </Badge>
          <Badge variant="default" className="px-4 py-1 text-base flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            AWS
          </Badge>
          <Badge variant="default" className="px-4 py-1 text-base flex items-center gap-2">
            <Database className="h-4 w-4" />
            SQL
          </Badge>
        </div>
      </section>

      {/* Section compétences techniques */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Compétences Techniques Démontrées</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" aria-hidden="true" />
                Architecture Frontend
              </CardTitle>
              <CardDescription>
                <ul className="space-y-2 mt-2">
                  <li>• Next.js avec TypeScript</li>
                  <li>• Composants UI modernes (shadcn/ui)</li>
                  <li>• État global et gestion des formulaires</li>
                </ul>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" aria-hidden="true" />
                Sécurité & Backend
              </CardTitle>
              <CardDescription>
                <ul className="space-y-2 mt-2">
                  <li>• API RESTful avec Laravel 10</li>
                  <li>• Authentification multi-couches</li>
                  <li>• Sanctum pour l&apos;API authentication</li>
                  <li>• Système de logging et monitoring</li>
                </ul>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" aria-hidden="true" />
                Infrastructure Cloud
              </CardTitle>
              <CardDescription>
                <ul className="space-y-2 mt-2">
                  <li>• Base de données SQL sur AWS</li>
                  <li>• Gestion du déploiement</li>
                  <li>• Configuration serveur</li>
                </ul>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Nouvelle section : Pages disponibles */}
      <section className="mt-16 mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Explorer les Fonctionnalités</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/login" className="block h-full">
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogIn className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  Connexion
                </CardTitle>
                <CardDescription className="min-h-[3rem]">
                  Page de connexion avec gestion des erreurs et validation
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/register" className="block h-full">
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  Inscription
                </CardTitle>
                <CardDescription className="min-h-[3rem]">
                  Création de compte avec validation des données
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/forgot-password" className="block h-full">
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeyRound className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  Mot de passe oublié
                </CardTitle>
                <CardDescription className="min-h-[3rem]">
                  Réinitialisation sécurisée du mot de passe
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/verify-email" className="block h-full">
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  Vérification Email
                </CardTitle>
                <CardDescription className="min-h-[3rem]">
                  Processus de vérification d&apos;email
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Inscrivez-vous et découvrir toutes les fonctionnalités
          </p>
          <Link href="/register">
            <Button size="lg" variant="default">
              Créer un compte
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Section état du projet */}
      <section className=" rounded-lg p-8" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-3xl font-semibold mb-8 text-center">
          Fonctionnalités Implémentées
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Colonne Réalisé */}
          <div className="border border-border rounded-lg p-6 bg-background">
            <h3 className="text-xl font-medium mb-6 text-primary">Réalisé :</h3>
            
            {/* Système d'authentification */}
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 font-medium mb-4">
                  <ArrowRight className="h-4 w-4 text-green-500" />
                  Système d&apos;authentification complet
                </div>
                <ul className="grid gap-3 ml-4">
                  {[
                    "Vérification par email avec token sécurisé",
                    "Réinitialisation de mot de passe avec lien temporaire",
                    "Protection CSRF et validation des données",
                    "Sessions sécurisées avec Sanctum",
                    "Protection contre les attaques par force brute",
                    "Limitation de tentatives de connexion (Rate Limiting)",
                    "Gestion des sessions avec régénération automatique",
                    "Validation robuste des données utilisateur"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 font-medium mb-4">
                  <ArrowRight className="h-4 w-4 text-green-500" />
                  Intégration Front/Back avec Axios
                </div>
                <ul className="grid gap-3 ml-4">
                  {[
                    "Configuration Axios avec credentials et XSRF-Token",
                    "Headers personnalisés pour API JSON",
                    "Intercepteurs pour requêtes et réponses",
                    "Gestion des erreurs avec logging en développement",
                    "Types TypeScript pour la configuration API"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Colonne En cours */}
          <div className="border border-border rounded-lg p-6 bg-background">
            <h3 className="text-xl font-medium mb-6 text-primary">En cours :</h3>
            <div className="border-l-4 border-blue-500 pl-4">
              <ul className="space-y-4">
                {[
                  "Gestion avancée des contenus",
                  "Optimisation des erreurs côté client sur l'authentification"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action pour les recruteurs */}
      <section className="text-center mt-16">
        <Button size="lg" className="mr-4">
          <Link target="_blank" href="https://github.com/HDZ65/laravel-breeze-next15-typescript-starter" 
                className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Voir le code source
          </Link>
        </Button>
        <Button size="lg" variant="outline">
          <Link target="_blank" href="https://www.linkedin.com/in/alexandre-hernandez-dev/"
                className="flex items-center gap-2">
            <Linkedin className="h-5 w-5" />
            LinkedIn 
          </Link>
        </Button>
      </section>
    </main>
  )
}