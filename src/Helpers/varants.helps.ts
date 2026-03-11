import { isDefaultVariant } from "../lib/constants";
import type { Product, ProductVariant } from "../types/products.type";

export function getActiveVariants(product: Product): ProductVariant[] {
    return product.variants.filter((v) => v.isActive && !v.isDeleted && !isDefaultVariant(v));
}

export function getAvailableColors(variants: ProductVariant[]): string[] {
    const colors = variants
        .map((v) => v.color)
        .filter((c): c is string => !!c && c !== 'default');
    return [...new Set(colors)];
}

export function getAvailableSizes(variants: ProductVariant[]): string[] {
    const sizes = variants
        .map((v) => v.size)
        .filter((s): s is string => !!s && s !== 'default');
    return [...new Set(sizes)];
}

export function findVariant(variants: ProductVariant[], color: string | null, size: string | null): ProductVariant | undefined {
    return variants.find((v) => {
        const colorMatch = !color || v.color === color;
        const sizeMatch = !size || v.size === size;
        return colorMatch && sizeMatch;
    });
}

export function getProductPrice(product: Product): number {
    return parseFloat(product.price) || 0;
}