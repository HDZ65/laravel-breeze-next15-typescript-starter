"use client"

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import React, { useState, useEffect, useMemo, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Order } from "../../../../../../../types"

interface OrdersTableProps extends React.HTMLAttributes<HTMLDivElement> {
    orders: Order[]
    onOrderUpdate?: (order: Order) => void
    onOrderDelete?: (orderId: string) => void
    itemsPerPage?: number
}
  
  /**
   * @function maskOrderId
   * @description Masque l'ID de la commande en ne montrant que les 4 derniers caractères
   * @accessibility Maintient la lisibilité tout en protégeant les données sensibles
   */
  const maskOrderId = (id: string) => {
    return `****${id.slice(-4)}`
  }
  
  /**
   * @function maskCustomerName
   * @description Masque le nom du client en ne montrant que les initiales
   * @accessibility Préserve l'identification tout en protégeant la vie privée
   */
  const maskCustomerName = (name: string) => {
    return name
      .split(' ')
      .map(part => `${part[0]}${'*'.repeat(part.length - 1)}`)
      .join(' ')
  }
  
  export function OrdersTable({ 
    orders, 
    itemsPerPage = 10,
    onOrderUpdate,
    onOrderDelete
  }: OrdersTableProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [localOrders, setLocalOrders] = useState(orders)
  
    useEffect(() => {
        setLocalOrders(orders)
    }, [orders])
  
    const paginatedOrders = useMemo(() => {
        console.log("Calcul pagination:", orders.length) // Debug
        return orders.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
    }, [orders, currentPage, itemsPerPage])
  
    /**
     * @function getStatusColor
     * @description Retourne la couleur appropriée pour le statut de la commande
     * @accessibility Assure un contraste suffisant pour la lisibilité
     */
    const getStatusColor = (status: Order['status']) => {
      const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      }
      return colors[status]
    }
  
    /**
     * @function getStatusLabel
     * @description Retourne le libellé en français du statut
     */
    const getStatusLabel = (status: Order['status']) => {
      const labels = {
        pending: 'En attente',
        processing: 'En cours',
        completed: 'Terminé',
        cancelled: 'Annulé'
      }
      return labels[status]
    }
  
    /**
     * @function formatDate
     * @description Formate une date en format français avec gestion d'erreur
     */
    const formatDate = (date: Date | string) => {
      try {
        return new Date(date).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } catch (error) {
        console.error('Erreur de formatage de date:', error)
        return 'Date invalide'
      }
    }
  
    /**
     * @function handleStatusUpdate
     * @description Met à jour le statut d'une commande avec gestion d'erreur
     */
    const handleStatusUpdate = useCallback(async (order: Order, newStatus: Order['status']) => {
        try {
            // Mise à jour locale immédiate
            const updatedOrder = {
                ...order,
                status: newStatus
            }
            
            // Mettre à jour l'état local immédiatement
            setLocalOrders(prev => 
                prev.map(o => o.id === order.id ? updatedOrder : o)
            )

            // Propager la mise à jour au parent
            onOrderUpdate?.(updatedOrder)
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error)
        }
    }, [onOrderUpdate])
  
    /**
     * @function handleOrderAction
     * @description Gère les actions sur une commande avec gestion d'erreur
     */
    const handleOrderAction = (order: Order, action: 'view' | 'update') => {
      try {
        if (action === 'view') {
          onOrderUpdate?.(order)
        } else {
          // autres actions...
        }
      } catch (error) {
        console.error('Erreur lors de l\'action sur la commande:', error)
        // Ici vous pourriez ajouter une notification d'erreur
      }
    }
  
    const handleDelete = useCallback(async (orderId: string) => {
        try {
            // Mise à jour locale immédiate
            setLocalOrders(prev => prev.filter(o => o.id !== orderId))
            
            // Propager la suppression au parent
            onOrderDelete?.(orderId)
        } catch (error) {
            console.error('Erreur lors de la suppression:', error)
        }
    }, [onOrderDelete])
  
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table aria-label="Liste des commandes">
            <TableHeader>
              <TableRow>
                <TableHead scope="col">ID Commande</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Paiement</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{maskOrderId(order.id)}</TableCell>
                  <TableCell>
                    {formatDate(order.date)}
                  </TableCell>
                  <TableCell>{maskCustomerName(order.customerName)}</TableCell>
                  <TableCell>{order.total.toFixed(2)} €</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(order.status)}
                    >
                      {getStatusLabel(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={order.paymentStatus === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : order.paymentStatus === 'refunded'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                      }
                    >
                      {order.paymentStatus === 'paid' ? 'Payé' 
                        : order.paymentStatus === 'refunded' ? 'Remboursé' 
                        : 'Non payé'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleOrderAction(order, 'view')}
                        >
                          Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(order, 'processing')}
                        >
                          Marquer en cours
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(order, 'completed')}
                        >
                          Marquer terminée
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(order.id)}
                        >
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination en bas du tableau */}
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          <span className="flex items-center px-2">
            Page {currentPage} sur {Math.ceil(orders.length / itemsPerPage)}
          </span>
          <Button 
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(orders.length / itemsPerPage), prev + 1))}
            disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
          >
            Suivant
          </Button>
        </div>

        {/* Debug: Afficher le nombre de commandes paginées */}
        <div className="text-sm text-gray-500">
            Commandes affichées: {paginatedOrders.length}
        </div>
      </div>
    )
  }