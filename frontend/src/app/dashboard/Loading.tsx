import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {


    return (
        <>
            <div className="flex">
                <Skeleton
                    className="h-screen w-[16rem] bg-muted/50"
                    aria-label="Chargement de la barre latérale"
                />

                <div
                    role="status"
                    aria-label="Chargement du contenu"
                    className="flex flex-1 flex-col gap-4 p-4 pt-0"
                >
                    {/* Barre de chargement horizontale */}
                    <Skeleton
                        className="w-full h-11 bg-muted/50"
                        aria-label="Chargement de la barre latérale"
                    />

                    {/* Grille de 3 cartes */}
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="aspect-video rounded-xl bg-muted/50"
                                aria-label={`Chargement de la carte ${i + 1}`}
                            />
                        ))}
                    </div>
                    <Skeleton
                        className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"
                        aria-label="Chargement du contenu principal"
                    />
                </div>
            </div>

            {/* Indicateur pour lecteurs d'écran */}
            <div className="sr-only" aria-live="polite">
                Chargement du tableau de bord en cours...
            </div>
        </>
    )
}