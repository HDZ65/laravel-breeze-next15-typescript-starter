import {
    Frame,
    Map,
    PieChart,
    Settings2,
    LayoutDashboard,
    FileText,
    Image,
    Palette,
    Users,
    Boxes,
    ShoppingCart,
    Package,
    Users2,
    TrendingUp,
    Globe,
    Link2,
    Languages,
  } from "lucide-react"
import devethiqueLogo from "./../../../public/images/devethiqueLogo.png"

export const data = {

    teams: [
      {
        name: process.env.NEXT_PUBLIC_APP_NAME || 'App Name',
        logo: devethiqueLogo,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: devethiqueLogo,
        plan: "Startup",
      }
    ],
    navMain: [
      {
        title: "Tableau de bord",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
        items: [
          {
            title: "Vue d'ensemble",
            url: "/dashboard",
          },
          {
            title: "Statistiques",
            url: "/dashboard/analytics",
          },
        ],
      },
      {
        title: "E-commerce",
        url: "/dashboard/ecommerce",
        icon: ShoppingCart,
        items: [
          {
            title: "Commandes",
            url: "/dashboard/ecommerce/orders",
          },
          {
            title: "Factures",
            url: "/dashboard/ecommerce/invoices",
          },
          {
            title: "Retours",
            url: "/dashboard/ecommerce/returns",
          },
        ],
      },
      {
        title: "Catalogue",
        url: "/dashboard/catalog",
        icon: Package,
        items: [
          {
            title: "Produits",
            url: "/dashboard/catalog/products",
          },
          {
            title: "Catégories",
            url: "/dashboard/catalog/categories",
          },
          {
            title: "Stocks",
            url: "/dashboard/catalog/inventory",
          },
          {
            title: "Attributs",
            url: "/dashboard/catalog/attributes",
          },
        ],
      },
      {
        title: "Marketing",
        url: "/dashboard/marketing",
        icon: TrendingUp,
        items: [
          {
            title: "Promotions",
            url: "/dashboard/marketing/promotions",
          },
          {
            title: "Coupons",
            url: "/dashboard/marketing/coupons",
          },
          {
            title: "Newsletters",
            url: "/dashboard/marketing/newsletters",
          },
        ],
      },
      {
        title: "Clients",
        url: "/dashboard/customers",
        icon: Users2,
        items: [
          {
            title: "Liste des clients",
            url: "/dashboard/customers/list",
          },
          {
            title: "Groupes",
            url: "/dashboard/customers/groups",
          },
          {
            title: "Avis",
            url: "/dashboard/customers/reviews",
          },
        ],
      },
      {
        title: "Contenu",
        url: "/dashboard/content",
        icon: FileText,
        items: [
          {
            title: "Pages",
            url: "/dashboard/content/pages",
          },
          {
            title: "Articles",
            url: "/dashboard/content/posts",
          },
          {
            title: "Composants",
            url: "/dashboard/content/components",
          },
        ],
      },
      {
        title: "Médias",
        url: "/dashboard/media",
        icon: Image,
        items: [
          {
            title: "Bibliothèque",
            url: "/dashboard/media/library",
          },
          {
            title: "Téléversement",
            url: "/dashboard/media/upload",
          },
          {
            title: "Catégories",
            url: "/dashboard/media/categories",
          },
        ],
      },
      {
        title: "Apparence",
        url: "/dashboard/appearance",
        icon: Palette,
        items: [
          {
            title: "Thèmes",
            url: "/dashboard/appearance/themes",
          },
          {
            title: "Menus",
            url: "/dashboard/appearance/menus",
          },
          {
            title: "Personnalisation",
            url: "/dashboard/appearance/customize",
          },
        ],
      },
      {
        title: "Extensions",
        url: "/dashboard/plugins",
        icon: Boxes,
        items: [
          {
            title: "Installés",
            url: "/dashboard/plugins/installed",
          },
          {
            title: "Ajouter",
            url: "/dashboard/plugins/add",
          },
          {
            title: "API",
            url: "/dashboard/plugins/api",
          },
        ],
      },
      {
        title: "Utilisateurs",
        url: "/dashboard/users",
        icon: Users,
        items: [
          {
            title: "Tous les utilisateurs",
            url: "/dashboard/users/all",
          },
          {
            title: "Rôles",
            url: "/dashboard/users/roles",
          },
          {
            title: "Permissions",
            url: "/dashboard/users/permissions",
          },
        ],
      },
      {
        title: "Paramètres",
        url: "/dashboard/settings",
        icon: Settings2,
        items: [
          {
            title: "Général",
            url: "/dashboard/settings/general",
          },
          {
            title: "SEO",
            url: "/dashboard/settings/seo",
          },
          {
            title: "Performance",
            url: "/dashboard/settings/performance",
          },
          {
            title: "Sécurité",
            url: "/dashboard/settings/security",
          },
        ],
      },
      {
        title: "Sites Web",
        url: "/dashboard/websites",
        icon: Globe,
        items: [
          {
            title: "Site Vitrine",
            url: "/dashboard/websites/showcase",
          },
          {
            title: "Blog",
            url: "/dashboard/websites/blog",
          },
          {
            title: "E-commerce",
            url: "/dashboard/websites/ecommerce",
          },
          {
            title: "Portfolio",
            url: "/dashboard/websites/portfolio",
          },
          {
            title: "Site Événementiel",
            url: "/dashboard/websites/event",
          }
        ]
      },
      {
        title: "Intégrations",
        url: "/dashboard/integrations",
        icon: Link2,
        items: [
          {
            title: "Réseaux Sociaux",
            url: "/dashboard/integrations/social",
          },
          {
            title: "Paiements",
            url: "/dashboard/integrations/payments",
          },
          {
            title: "Analytics",
            url: "/dashboard/integrations/analytics",
          },
          {
            title: "APIs Externes",
            url: "/dashboard/integrations/external-apis",
          }
        ]
      },
      {
        title: "Multilingue",
        url: "/dashboard/languages",
        icon: Languages,
        items: [
          {
            title: "Traductions",
            url: "/dashboard/languages/translations",
          },
          {
            title: "Régions",
            url: "/dashboard/languages/regions",
          }
        ]
      }
    ],
    projects: [
      {
        name: "Design & Ingénierie",
        url: "#",
        icon: Frame,
      },
      {
        name: "Ventes & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Voyages",
        url: "#",
        icon: Map,
      },
    ],
  }