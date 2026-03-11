
import { useParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import type { Product } from '../../types/products.type'
import ProductGrid from '../../components/features/products/ProductGrid'
import Header from '../../components/layout/Header/Header'
import WhatsAppButton from '../../components/ui/WhatsAppButton'
import SocialProofToast from '../../components/ui/SocialProofToast'

export default function ProductsGridPage() {
    const { storeSlug } = useParams<{ storeSlug: string }>()
    const navigate = useNavigate()
    const { data, isLoading, isError } = useProducts(storeSlug!)

    function handleProductClick(product: Product) {
        navigate(`/${storeSlug}/produit/${product.slug}`)
    }
    if (isLoading) return (
        <div className="flex items-center justify-center h-screen bg-[#FAF8F5]">
            <div className="w-8 h-8 border-2 border-[#E8303A] border-t-transparent rounded-full animate-spin" />
        </div>
    )
    if (isError) return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#FAF8F5] gap-3 px-8 text-center">
            <p className="font-['Fraunces'] text-xl font-bold">Boutique introuvable</p>
            <p className="text-sm text-[#9B9590]">Vérifie le lien et réessaie</p>
        </div>
    )
    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            <Header
                vendorInitial={storeSlug?.[0].toUpperCase() ?? 'S'}
                vendorHandle={`@${storeSlug}`}
                vendorSub="Boutique officielle 🇨🇮"
                isLive={false}
                cartCount={0}
                onCartClick={() => console.log('ouvrir panier')}
            />
            <ProductGrid
                products={data?.products ?? []}
                onProductClick={handleProductClick}
            />

            {/*Bouton WhatsApp — numéro du vendeur */}
            <WhatsAppButton phone="+2250747492156" />

            {/*Social proof — activité en temps réel */}
            <SocialProofToast />
        </div>
    )
}