/**
 * @title Données mockées pour le système de gestion des commandes e-commerce
 * @description Fichier contenant les données de test pour les commandes et leurs statistiques
 */

import { Order } from "../../../../../../../types/orders"

export const mockOrders: Order[] = [
  {
    id: "1",
    date: new Date("2024-11-15"),
    customerName: "Jean Dupont",
    customerEmail: "jean.dupont@example.com",
    customerPhone: "+33612345678",
    total: 149.99,
    status: "processing",
    paymentStatus: "paid",
    items: [
      {
        id: "item1",
        productId: "prod1",
        name: "Écouteurs Bluetooth",
        quantity: 1,
        unitPrice: 149.99,
        total: 149.99
      }
    ],
    shippingAddress: {
      street: "15 Rue de la Paix",
      city: "Paris",
      postalCode: "75002",
      country: "France"
    },
    billingAddress: {
      street: "15 Rue de la Paix",
      city: "Paris",
      postalCode: "75002",
      country: "France"
    }
  },
  {
    id: "2",
    date: new Date("2024-11-14"),
    customerName: "Marie Martin",
    customerEmail: "marie.martin@example.com",
    customerPhone: "+33623456789",
    total: 299.98,
    status: "completed",
    paymentStatus: "paid",
    items: [
      {
        id: "item2",
        productId: "prod2",
        name: "Montre Connectée",
        quantity: 1,
        unitPrice: 299.98,
        total: 299.98
      }
    ],
    shippingAddress: {
      street: "28 Avenue des Champs-Élysées",
      city: "Paris",
      postalCode: "75008",
      country: "France"
    },
    billingAddress: {
      street: "28 Avenue des Champs-Élysées",
      city: "Paris",
      postalCode: "75008",
      country: "France"
    }
  },
  {
    id: "3",
    date: new Date("2024-11-13"),
    customerName: "Pierre Dubois",
    customerEmail: "pierre.dubois@example.com",
    customerPhone: "+33634567890",
    total: 79.99,
    status: "pending",
    paymentStatus: "unpaid",
    items: [
      {
        id: "item3",
        productId: "prod3",
        name: "Chargeur Sans Fil",
        quantity: 1,
        unitPrice: 79.99,
        total: 79.99
      }
    ],
    shippingAddress: {
      street: "45 Rue du Commerce",
      city: "Lyon",
      postalCode: "69002",
      country: "France"
    },
    billingAddress: {
      street: "45 Rue du Commerce",
      city: "Lyon",
      postalCode: "69002",
      country: "France"
    }
  },
  {
    id: "4", 
    date: new Date("2024-11-12"),
    customerName: "Sophie Lambert",
    customerEmail: "sophie.lambert@example.com",
    customerPhone: "+33645678901",
    total: 459.97,
    status: "completed",
    paymentStatus: "paid",
    items: [
      {
        id: "item4a",
        productId: "prod4",
        name: "Tablette Android",
        quantity: 1,
        unitPrice: 399.99,
        total: 399.99
      },
      {
        id: "item4b", 
        productId: "prod5",
        name: "Coque Protection",
        quantity: 1,
        unitPrice: 59.98,
        total: 59.98
      }
    ],
    shippingAddress: {
      street: "12 Boulevard Victor Hugo",
      city: "Nice",
      postalCode: "06000",
      country: "France"
    },
    billingAddress: {
      street: "12 Boulevard Victor Hugo", 
      city: "Nice",
      postalCode: "06000",
      country: "France"
    }
  },
  {
    id: "5",
    date: new Date("2024-11-11"),
    customerName: "Lucas Moreau",
    customerEmail: "lucas.moreau@example.com", 
    customerPhone: "+33656789012",
    total: 1299.99,
    status: "processing",
    paymentStatus: "paid",
    items: [
      {
        id: "item5",
        productId: "prod6",
        name: "Ordinateur Portable Pro",
        quantity: 1,
        unitPrice: 1299.99,
        total: 1299.99
      }
    ],
    shippingAddress: {
      street: "8 Rue de la République",
      city: "Marseille",
      postalCode: "13001",
      country: "France"
    },
    billingAddress: {
      street: "8 Rue de la République",
      city: "Marseille", 
      postalCode: "13001",
      country: "France"
    }
  },
  {
    id: "6",
    date: new Date("2024-11-10"),
    customerName: "Emma Bernard",
    customerEmail: "emma.bernard@example.com",
    customerPhone: "+33667890123",
    total: 89.97,
    status: "cancelled",
    paymentStatus: "refunded",
    items: [
      {
        id: "item6",
        productId: "prod7",
        name: "Enceinte Bluetooth",
        quantity: 1,
        unitPrice: 89.97,
        total: 89.97
      }
    ],
    shippingAddress: {
      street: "25 Avenue Jean Jaurès",
      city: "Toulouse",
      postalCode: "31000",
      country: "France"
    },
    billingAddress: {
      street: "25 Avenue Jean Jaurès",
      city: "Toulouse",
      postalCode: "31000",
      country: "France"
    }
  },
  {
    id: "7",
    date: new Date("2024-11-09"),
    customerName: "Thomas Petit",
    customerEmail: "thomas.petit@example.com",
    customerPhone: "+33678901234",
    total: 758.96,
    status: "completed",
    paymentStatus: "paid",
    items: [
      {
        id: "item7a",
        productId: "prod8",
        name: "Smartphone 5G",
        quantity: 1,
        unitPrice: 699.99,
        total: 699.99
      },
      {
        id: "item7b",
        productId: "prod9",
        name: "Protection écran",
        quantity: 2,
        unitPrice: 29.99,
        total: 58.97
      }
    ],
    shippingAddress: {
      street: "3 Place Bellecour",
      city: "Lyon",
      postalCode: "69002",
      country: "France"
    },
    billingAddress: {
      street: "3 Place Bellecour",
      city: "Lyon",
      postalCode: "69002",
      country: "France"
    }
  },
  {
    id: "8",
    date: new Date("2024-11-08"),
    customerName: "Léa Rousseau",
    customerEmail: "lea.rousseau@example.com",
    customerPhone: "+33689012345",
    total: 249.98,
    status: "pending",
    paymentStatus: "unpaid",
    items: [
      {
        id: "item8",
        productId: "prod10",
        name: "Casque Audio Premium",
        quantity: 1,
        unitPrice: 249.98,
        total: 249.98
      }
    ],
    shippingAddress: {
      street: "17 Rue des Capucins",
      city: "Bordeaux",
      postalCode: "33000",
      country: "France"
    },
    billingAddress: {
      street: "17 Rue des Capucins",
      city: "Bordeaux",
      postalCode: "33000",
      country: "France"
    }
  },
  {
    id: "9",
    date: new Date("2024-11-07"),
    customerName: "Antoine Leroy",
    customerEmail: "antoine.leroy@example.com",
    customerPhone: "+33690123456",
    total: 1899.97,
    status: "processing",
    paymentStatus: "paid",
    items: [
      {
        id: "item9a",
        productId: "prod11",
        name: "TV OLED 55\"",
        quantity: 1,
        unitPrice: 1799.99,
        total: 1799.99
      },
      {
        id: "item9b",
        productId: "prod12",
        name: "Support mural TV",
        quantity: 1,
        unitPrice: 99.98,
        total: 99.98
      }
    ],
    shippingAddress: {
      street: "42 Rue de la Liberté",
      city: "Lille",
      postalCode: "59000",
      country: "France"
    },
    billingAddress: {
      street: "42 Rue de la Liberté",
      city: "Lille",
      postalCode: "59000",
      country: "France"
    }
  },
  {
    id: "10",
    date: new Date("2024-11-06"),
    customerName: "Julie Mercier",
    customerEmail: "julie.mercier@example.com",
    customerPhone: "+33701234567",
    total: 159.96,
    status: "completed",
    paymentStatus: "paid",
    items: [
      {
        id: "item10",
        productId: "prod13",
        name: "Imprimante WiFi",
        quantity: 1,
        unitPrice: 159.96,
        total: 159.96
      }
    ],
    shippingAddress: {
      street: "5 Rue du Vieux Port",
      city: "Marseille",
      postalCode: "13002",
      country: "France"
    },
    billingAddress: {
      street: "5 Rue du Vieux Port",
      city: "Marseille",
      postalCode: "13002",
      country: "France"
    }
  },
  {
    id: "11",
    date: new Date("2024-11-05"),
    customerName: "Camille Durand",
    customerEmail: "camille.durand@example.com",
    customerPhone: "+33712345678",
    total: 2499.98,
    status: "completed",
    paymentStatus: "paid",
    items: [
      {
        id: "item11a",
        productId: "prod14",
        name: "MacBook Air M2",
        quantity: 1,
        unitPrice: 2299.99,
        total: 2299.99
      },
      {
        id: "item11b",
        productId: "prod15",
        name: "Housse Protection MacBook",
        quantity: 1,
        unitPrice: 199.99,
        total: 199.99
      }
    ],
    shippingAddress: {
      street: "14 Rue de la Soie",
      city: "Lyon",
      postalCode: "69001",
      country: "France"
    },
    billingAddress: {
      street: "14 Rue de la Soie",
      city: "Lyon",
      postalCode: "69001",
      country: "France"
    }
  },
  {
    id: "12",
    date: new Date("2024-11-04"),
    customerName: "Hugo Lefebvre",
    customerEmail: "hugo.lefebvre@example.com",
    customerPhone: "+33723456789",
    total: 349.97,
    status: "processing",
    paymentStatus: "paid",
    items: [
      {
        id: "item12",
        productId: "prod16",
        name: "Drone Camera 4K",
        quantity: 1,
        unitPrice: 349.97,
        total: 349.97
      }
    ],
    shippingAddress: {
      street: "67 Avenue Foch",
      city: "Strasbourg",
      postalCode: "67000",
      country: "France"
    },
    billingAddress: {
      street: "67 Avenue Foch",
      city: "Strasbourg",
      postalCode: "67000",
      country: "France"
    }
  },
  {
    id: "13",
    date: new Date("2024-11-11"),
    customerName: "Sarah Cohen",
    customerEmail: "sarah.cohen@example.com",
    customerPhone: "+33734567890",
    total: 1299.96,
    status: "completed",
    paymentStatus: "paid",
    items: [
      {
        id: "item13a",
        productId: "prod17",
        name: "iPhone 15",
        quantity: 1,
        unitPrice: 1099.99,
        total: 1099.99
      },
      {
        id: "item13b",
        productId: "prod18",
        name: "AirPods Pro",
        quantity: 1,
        unitPrice: 199.97,
        total: 199.97
      }
    ],
    shippingAddress: {
      street: "23 Rue des Rosiers",
      city: "Paris",
      postalCode: "75004",
      country: "France"
    },
    billingAddress: {
      street: "23 Rue des Rosiers",
      city: "Paris",
      postalCode: "75004",
      country: "France"
    }
  },
  {
    id: "14",
    date: new Date("2024-11-02"),
    customerName: "Mathilde Roux",
    customerEmail: "mathilde.roux@example.com",
    customerPhone: "+33745678901",
    total: 899.98,
    status: "pending",
    paymentStatus: "unpaid",
    items: [
      {
        id: "item14",
        productId: "prod19",
        name: "Console PS5",
        quantity: 1,
        unitPrice: 899.98,
        total: 899.98
      }
    ],
    shippingAddress: {
      street: "89 Rue de la République",
      city: "Saint-Étienne",
      postalCode: "42000",
      country: "France"
    },
    billingAddress: {
      street: "89 Rue de la République",
      city: "Saint-Étienne",
      postalCode: "42000",
      country: "France"
    }
  }
]

/**
 * @description Statistiques mensuelles des commandes
 * @note Chiffres ajustés pour une entreprise de développement web française (données mensuelles)
 */
export const orderStats = {
  totalOrders: 24, // 1-2 nouveaux projets par semaine en moyenne
  totalRevenue: 84500.00, // Moyenne de projets mixtes (grands et petits)
  pendingOrders: 8, // Prospects en cours de signature
  conversionRate: 15.4, // Plus élevé car B2B tech
  averageOrderValue: 3520.83, // Moyenne entre petites missions et gros projets
  recentStats: {
    orderGrowth: 8.5,
    revenueGrowth: 12.7,
    conversionGrowth: 2.1,
    monthlyRecurringRevenue: 22400.00, // Maintenance, TMA, hébergement
    customerRetentionRate: 78.4, // Fidélisation forte en B2B
    cartAbandonmentRate: 45.2, // Taux d'abandon de devis
    conversionDetails: {
      direct: 22.5, // Contacts directs
      inbound: 12.8, // Marketing entrant
      referral: 28.6, // Recommandations
      newClients: 8.4,
      returningClients: 32.8
    }
  },
  periodComparison: {
    previousPeriod: 76800.00,
    currentPeriod: 84500.00,
    percentageChange: 10.02
  }
}

/**
 * @description Données des statuts possibles
 */
export const orderStatuses = {
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'En cours', color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Terminé', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800' }
}

/**
 * @description Données des statuts de paiement
 */
export const paymentStatuses = {
  paid: { label: 'Payé', color: 'bg-green-100 text-green-800' },
  unpaid: { label: 'Non payé', color: 'bg-red-100 text-red-800' },
  refunded: { label: 'Remboursé', color: 'bg-orange-100 text-orange-800' }
}