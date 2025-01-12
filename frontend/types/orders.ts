export interface Order {
    id: string
    date: Date | string
    customerName: string
    customerEmail: string
    customerPhone?: string
    total: number
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
    paymentStatus: 'paid' | 'unpaid' | 'refunded'
    items: OrderItem[]
    shippingAddress: Address
    billingAddress: Address
  }
  
  export interface OrderItem {
    id: string
    productId: string
    name: string
    quantity: number
    unitPrice: number
    total: number
  }
  
  export interface Address {
    street: string
    city: string
    postalCode: string
    country: string
  }