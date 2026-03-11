import type { CityData } from "../../types/city.type";
import type { Product, ProductVariant } from "../../types/products.type";

export const STORE_CONFIG = {
    defaultSlug: 'tech-universe',
    apiBaseUrl: import.meta.env.VITE_API_URL || 'https://api.example.com',
};

export const CITIES: CityData[] = [
    {
        name: 'Abidjan',
        communes: ['Cocody', 'Plateau', 'Yopougon', 'Marcory', 'Adjamé', 'Treichville', 'Abobo', 'Koumassi', 'Port-Bouët', 'Attécoubé'],
    },
    {
        name: 'Bouaké',
        communes: ['Koko', 'Belleville', 'Niangon', 'Bromakoté', 'Air France'],
    },
    {
        name: 'Yamoussoukro',
        communes: ['Centre', 'Dioulakro', 'Morofé', 'N\'Zuessy'],
    },
    {
        name: 'Daloa',
        communes: ['Centre', 'Lobia', 'Orly'],
    },
    {
        name: 'San-Pedro',
        communes: ['Centre', 'Bardot', 'Grand-Zèbery'],
    },
];

export const COLOR_MAP: Record<string, string> = {
    red: '#EF4444',
    rouge: '#EF4444',
    blue: '#3B82F6',
    bleu: '#3B82F6',
    black: '#111111',
    noir: '#111111',
    white: '#F9FAFB',
    blanc: '#F9FAFB',
    green: '#22C55E',
    vert: '#22C55E',
    yellow: '#EAB308',
    jaune: '#EAB308',
    orange: '#F97316',
    purple: '#A855F7',
    violet: '#A855F7',
    pink: '#EC4899',
    rose: '#EC4899',
    gray: '#6B7280',
    gris: '#6B7280',
    brown: '#92400E',
    marron: '#92400E',
    navy: '#1E3A5F',
    beige: '#D2B48C',
    default: '#9CA3AF',
};

export const formatPrice = (price: number | string): string => {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('fr-CI').format(num);
};

export const getColorHex = (colorName: string): string => {
    const key = colorName.toLowerCase().trim();
    return COLOR_MAP[key] || COLOR_MAP['default'];
};

export const isDefaultVariant = (variant: { color?: string | null; size?: string | null }): boolean => {
    return variant.color === 'default' || variant.size === 'default';
};


export const fmt = (n: number | string) => new Intl.NumberFormat('fr-CI').format(Number(n));
export const getActiveVariants = (p: Product) => p.variants.filter(v => v.isActive && !v.isDeleted && v.color !== 'default' && v.size !== 'default');
export const getColors = (vs: ProductVariant[]) => [...new Set(vs.map(v => v.color).filter(Boolean) as string[])];
export const getSizes = (vs: ProductVariant[]) => [...new Set(vs.map(v => v.size).filter(Boolean) as string[])];
export const getPrimaryImage = (p: Product) => p.images.find(i => i.isPrimary)?.imageUrl || p.images[0]?.imageUrl || '';
