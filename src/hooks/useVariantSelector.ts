import { useState, useMemo } from 'react'
import type { ProductVariant } from '../types/products.type'

export function useVariantSelector(variants: ProductVariant[]) {

    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)

    // Couleurs uniques disponibles
    const availableColors = useMemo(() => {
        return [...new Set(
            variants
                .filter(v => v.isActive && !v.isDeleted && v.color)
                .map(v => v.color as string)
        )]
    }, [variants])

    // Tailles uniques disponibles
    const availableSizes = useMemo(() => {
        return [...new Set(
            variants
                .filter(v => v.isActive && !v.isDeleted && v.size)
                .map(v => v.size as string)
        )]
    }, [variants])

    const hasColors = availableColors.length > 0
    const hasSizes = availableSizes.length > 0
    const hasVariants = hasColors || hasSizes

    // Variante sélectionnée
    const selectedVariant = useMemo(() => {
        return variants.find(v =>
            (!hasColors || v.color === selectedColor) &&
            (!hasSizes || v.size === selectedSize) &&
            v.isActive && !v.isDeleted
        ) ?? null
    }, [variants, selectedColor, selectedSize, hasColors, hasSizes])

    // Prêt à commander ?
    const isReady = !hasVariants || (
        (!hasColors || selectedColor !== null) &&
        (!hasSizes || selectedSize !== null)
    )

    function increaseQty() { setQuantity(q => Math.min(q + 1, 99)) }
    function decreaseQty() { setQuantity(q => Math.max(q - 1, 1)) }

    return {
        selectedColor, setSelectedColor,
        selectedSize, setSelectedSize,
        quantity, increaseQty, decreaseQty,
        availableColors, availableSizes,
        hasColors, hasSizes, hasVariants,
        selectedVariant, isReady,
    }
}