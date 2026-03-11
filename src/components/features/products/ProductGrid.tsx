import type { Product } from '../../../types/products.type'
import ProductCard from './ProductCard'

interface ProductGridProps {
    products: Product[]
    onProductClick: (product: Product) => void
}

export default function ProductGrid({ products, onProductClick }: ProductGridProps) {
    return (
        <div className="grid grid-cols-2 gap-3 p-3 pb-24">
            {products.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    featured={index === 0}
                    onClick={onProductClick}
                />
            ))}
        </div>
    )
}