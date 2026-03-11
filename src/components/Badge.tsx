import type { ReactNode } from "react";

export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'sale' | 'new' }) {
    const styles = {
        default: 'bg-gray-900 text-white',
        sale: 'bg-red-500 text-white',
        new: 'bg-emerald-500 text-white',
    };
    return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles[variant]}`}>{children}</span>;
}