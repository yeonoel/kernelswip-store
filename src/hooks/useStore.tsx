import { createContext, useContext } from 'react';
import type { Store } from "../types/store.type";
import type { ReactNode } from 'react';


interface ThemeProviderProps {
    children: ReactNode;
    value: Store; // C'est ici que tu reçois les infos de la boutique
}

const StoreContext = createContext<Store | null>(null);

export const StoreProvider = ({ children, value }: ThemeProviderProps) => {
    return (
        <StoreContext.Provider value={value} >
            {children}
        </StoreContext.Provider>
    );
}

export function useStore(): Store {
    const ctx = useContext(StoreContext);
    if (!ctx) {
        throw new Error('useStore must be used within StoreProvider');
    }
    return ctx;
}
