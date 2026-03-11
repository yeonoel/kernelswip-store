
import { type Product } from "../../../types/products.type"

interface ProductCardProps {
    product: Product
    featured?: boolean
    onClick: (product: Product) => void
}

export default function ProductCard({ product, featured = false, onClick }: ProductCardProps) {
    // Image principale
    const primaryImage = product.images.find(img => img.isPrimary) ?? product.images[0]
    // Couleurs uniques depuis les variants
    const uniqueColors = [...new Set(
        product.variants
            .filter(v => v.isActive && !v.isDeleted && v.color)
            .map(v => v.color as string)
    )]

    return (
        <div
            onClick={() => onClick(product)}
            className={`
        bg-white rounded-2xl overflow-hidden cursor-pointer border border-[#EBEBE6]
        active:scale-[0.97] transition-transform duration-150
        ${featured ? 'col-span-2' : ''}
      `}
        >
            {/* Image */}
            <div className={`relative w-full bg-[#f0eeeb] ${featured ? 'h-[240px]' : 'h-[170px]'}`}>
                {primaryImage ? (
                    <img
                        src={primaryImage.imageUrl}
                        alt={primaryImage.altText}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#9B9590] text-sm">
                        Pas d'image
                    </div>
                )}

                {/* Badge LIVE */}
                {product.isFeatured && (
                    <div className="absolute top-2 left-2 bg-[#E8303A] text-white text-[9px] font-bold px-2 py-1 rounded-full">
                        🔴 LIVE
                    </div>
                )}

                {/* Nombre de photos */}
                {product.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur text-white text-[9px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
                        📷 {product.images.length}
                    </div>
                )}

                {/* Badge Promo */}
                {product.isOnSale && product.discountPercentage && (
                    <div className="absolute top-2 right-2 bg-[#FFCB47] text-[#111010] text-[9px] font-bold px-2 py-1 rounded-full">
                        -{product.discountPercentage}%
                    </div>
                )}
            </div>

            {/* Infos */}
            <div className="px-3 pt-2.5 pb-3">
                <p className="font-['Fraunces'] text-[14px] font-bold leading-tight mb-2 truncate">
                    {product.name}
                </p>
                <div className="flex items-center justify-between">

                    {/* Prix */}
                    <div className="flex items-center gap-2">
                        <span className="font-['Fraunces'] text-[16px] font-bold text-[#E8303A]">
                            {Number(product.price).toLocaleString()} FCFA
                        </span>
                        {product.compareAtPrice && (
                            <span className="text-[11px] text-[#9B9590] line-through">
                                {Number(product.compareAtPrice).toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Pastilles couleurs */}
                    {uniqueColors.length > 0 && (
                        <div className="flex gap-1">
                            {uniqueColors.slice(0, 3).map((color, i) => (
                                <div
                                    key={i}
                                    className="w-[9px] h-[9px] rounded-full border border-black/10"
                                    style={{ background: color }}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}