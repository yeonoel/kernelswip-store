import { createContext, useCallback, useContext, useReducer, type ReactNode } from "react";
import type { Cart, CartItem } from "../types/cart.type";

// ─── CART CONTEXT ─────────────────────────────────────────────────────────────
type CartAction = { type: 'ADD'; payload: CartItem } | { type: 'REMOVE'; payload: { productId: string; variantId: string } } | { type: 'UPDATE_QTY'; payload: { productId: string; variantId: string; qty: number } } | { type: 'CLEAR' };

function cartReducer(state: Cart, action: CartAction): Cart {
    let items: CartItem[];
    switch (action.type) {
        case 'ADD':
            const ex = state.items.find(i => i.productId === action.payload.productId && i.variantId === action.payload.variantId);
            items = ex ? state.items.map(i => i.productId === action.payload.productId && i.variantId === action.payload.variantId ? { ...i, quantity: i.quantity + 1 } : i) : [...state.items, { ...action.payload, quantity: 1 }];
            break;
        case 'REMOVE':
            items = state.items.filter(i => !(i.productId === action.payload.productId && i.variantId === action.payload.variantId));
            break;
        case 'UPDATE_QTY':
            items = action.payload.qty <= 0 ? state.items.filter(i => !(i.productId === action.payload.productId && i.variantId === action.payload.variantId)) : state.items.map(i => i.productId === action.payload.productId && i.variantId === action.payload.variantId ? { ...i, quantity: action.payload.qty } : i);
            break;
        case 'CLEAR': return { items: [], total: 0, itemsCount: 0 };
        default: return state;
    }
    return { items, total: items.reduce((s, i) => s + i.price * i.quantity, 0), itemsCount: items.reduce((s, i) => s + i.quantity, 0) };
}

interface CartCtx { cart: Cart; addItem: (i: CartItem) => void; removeItem: (pId: string, vId: string) => void; updateQty: (pId: string, vId: string, q: number) => void; clearCart: () => void; isInCart: (pId: string) => boolean; }
export const CartContext = createContext<CartCtx | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemsCount: 0 });
    const addItem = useCallback((i: CartItem) => dispatch({ type: 'ADD', payload: i }), []);
    const removeItem = useCallback((pId: string, vId: string) => dispatch({ type: 'REMOVE', payload: { productId: pId, variantId: vId } }), []);
    const updateQty = useCallback((pId: string, vId: string, qty: number) => dispatch({ type: 'UPDATE_QTY', payload: { productId: pId, variantId: vId, qty } }), []);
    const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);
    const isInCart = useCallback((pId: string) => cart.items.some(i => i.productId === pId), [cart.items]);
    return <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, isInCart }}>{children}</CartContext.Provider>;
}
