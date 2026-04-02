import { create } from 'zustand'
import type { Product } from '../types/products.type'
import type { Commune, Quartier } from '../data'

type OrderStep = 'idle' | 'phone' | 'commune' | 'quartier' | 'confirm' | 'success'

interface OrderItem {
    product: Product
    color: string | null
    size: string | null
    quantity: number
    variantId?: string
}

interface OrderStore {

    step: OrderStep
    item: OrderItem | null
    phone: string
    commune: Commune | null
    quartier: Quartier | null
    customerNote: string

    openOrder: (item: OrderItem) => void
    closeOrder: () => void
    setPhone: (phone: string) => void
    setCommune: (commune: Commune) => void
    setQuartier: (quartier: Quartier) => void
    setCustomerNote: (note: string) => void
    goTo: (step: OrderStep) => void
    reset: () => void
}

export const useOrderStore = create<OrderStore>((set) => ({
    step: 'idle',
    item: null,
    phone: '',
    commune: null,
    quartier: null,
    customerNote: '',

    openOrder: (item) => set({ item, step: 'phone', phone: '', commune: null, quartier: null }),
    closeOrder: () => set({ step: 'idle' }),
    setPhone: (phone) => set({ phone }),
    setCommune: (commune) => set({ commune, quartier: null }),
    setQuartier: (quartier) => set({ quartier }),
    setCustomerNote: (customerNote) => set({ customerNote }),
    goTo: (step) => set({ step }),
    reset: () => set({ step: 'idle', item: null, phone: '', commune: null, quartier: null, customerNote: '' }),
}))