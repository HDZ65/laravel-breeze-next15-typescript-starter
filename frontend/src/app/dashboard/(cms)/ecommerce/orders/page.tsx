"use client"
/**
 * @title Page de gestion des commandes E-commerce
 * @description Interface administrateur permettant de gérer et visualiser les commandes
 */

import { useState, useMemo, useCallback } from 'react'
import { mockOrders, orderStats } from './data/orders-data'
import { DateRange } from "react-day-picker"
import { Input } from '@/components/ui/input'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DateRangePicker } from '@/components/date-range-picker'
import { OrdersTable } from './components/order-table'
import { Order } from '../../../../../../types'


export default function OrdersPage() {
  // États 
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  
  // Filtrer les commandes en fonction des critères
  const filteredOrders = useMemo(() => {
    console.log("Filtrage des commandes:", orders.length) // Debug
    return orders.filter(order => {
      const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter

      const matchesDate = !dateRange?.from || !dateRange?.to || 
        (new Date(order.date) >= dateRange.from && new Date(order.date) <= dateRange.to)

      return matchesSearch && matchesStatus && matchesDate
    })
  }, [orders, searchTerm, statusFilter, dateRange])

  // Fonction pour mettre à jour une commande existante
  const handleUpdateOrder = useCallback((updatedOrder: Order) => {
    console.log("Mise à jour de la commande:", updatedOrder.id) // Debug
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === updatedOrder.id ? updatedOrder : order
      )
    )
  }, [])

  // Fonction pour supprimer une commande
  const handleDeleteOrder = useCallback((orderId: string) => {
    console.log("Suppression de la commande:", orderId) // Debug
    setOrders(prevOrders => 
      prevOrders.filter(order => order.id !== orderId)
    )
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" role="heading" aria-level={1}>
        Gestion des Commandes
      </h1>

      {/* Filtres et Recherche */}
      <div className="flex flex-wrap gap-4" role="search" aria-label="Filtres de commandes">
        <Input
          type="search"
          placeholder="Rechercher une commande..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          aria-label="Rechercher une commande"
        />
        
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
          aria-label="Filtrer par statut"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="processing">En cours</SelectItem>
            <SelectItem value="completed">Terminé</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
          </SelectContent>
        </Select>

        <DateRangePicker
          date={dateRange}
          onDateChange={setDateRange}
          aria-label="Sélectionner une période"
        />
      </div>

      {/* Statistiques rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Commandes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +{orderStats.recentStats.orderGrowth}% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chiffre d&apos;Affaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.totalRevenue} €</div>
            <p className="text-xs text-muted-foreground">
              +{orderStats.recentStats.revenueGrowth}% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Commandes en Attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              À traiter rapidement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taux de Conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              +{orderStats.recentStats.conversionGrowth}% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Debug: Afficher le nombre de commandes */}
      <div className="text-sm text-gray-500">
        Nombre total de commandes: {orders.length}
        Commandes filtrées: {filteredOrders.length}
      </div>

      {/* Tableau des commandes */}
      <OrdersTable 
        orders={orders} // Utiliser l'état non filtré
        onOrderUpdate={handleUpdateOrder}
        onOrderDelete={handleDeleteOrder}
      />
    </div>
  )
}