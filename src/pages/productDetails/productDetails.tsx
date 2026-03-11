import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProduct } from '../../hooks/useProducts'
import { useVariantSelector } from '../../hooks/useVariantSelector'
import Carousel from '../../components/features/products/Carousel'
import VariantPicker from '../../components/features/products/VariantPicker'
import StickyBar from '../../components/features/products/StickyBar'
import { useOrderStore } from '../../hooks/useOrdersStore'
import OrderBottomSheet from '../../components/modals/OrderBottomSheet'
import SocialProofToast from '../../components/ui/SocialProofToast'


export default function ProductDetails() {
    const { storeSlug, productSlug } = useParams<{ storeSlug: string; productSlug: string }>()
    const navigate = useNavigate()
    const [showError, setShowError] = useState(false)

    const { data: product, isLoading, isError } = useProduct(storeSlug!, productSlug!);
    const openOrder = useOrderStore(s => s.openOrder)

    const {
        selectedColor, setSelectedColor,
        selectedSize, setSelectedSize,
        quantity, increaseQty, decreaseQty,
        availableColors, availableSizes,
        hasVariants, isReady,
    } = useVariantSelector(product?.variants ?? [])

    // Prix total affiché
    const basePrice = Number(product?.price ?? 0)
    const totalPrice = `${(basePrice * quantity).toLocaleString()} FCFA`

    function handleOrder() {
        if (!isReady || !product) return;
        setTimeout(() => setShowError(false), 2000)

        // TODO → ouvrir modal OTP
        openOrder({
            product,
            color: selectedColor,
            size: selectedSize,
            quantity,
        })
    }

    function handleAddToCart() {
        if (!isReady) {
            setShowError(true)
            setTimeout(() => setShowError(false), 2000)
            return
        }
        // TODO → addToCart()
        console.log('Panier', { selectedColor, selectedSize, quantity })
    }

    // ── Loading
    if (isLoading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="w-8 h-8 border-2 border-[#E8303A] border-t-transparent rounded-full animate-spin" />
        </div>
    )

    // ── Erreur
    if (isError || !product) return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-3 px-8 text-center">
            <p className="font-['Fraunces'] text-xl font-bold">Produit introuvable</p>
            <button onClick={() => navigate(-1)} className="text-sm text-[#E8303A] underline">
                Retour
            </button>
        </div>
    )

    return (
        <div className="bg-white pb-2">
            {/* Mini nav — flèche + nom produit + panier */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#EBEBE6] px-4 py-3 flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#EBEBE6] flex items-center justify-center text-lg active:scale-90 transition-transform"
                >
                    ←
                </button>
                <p className="flex-1 font-['Fraunces'] text-[15px] font-bold truncate">
                    {product?.name}
                </p>
                <button className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#EBEBE6] flex items-center justify-center text-lg active:scale-90 transition-transform">
                    🛒
                </button>
            </div>


            {/* Carousel photos */}
            <Carousel images={product.images} />

            {/* Infos produit */}
            <div className="px-4 pt-5 pb-4">
                <h1 className="font-['Fraunces'] text-[26px] font-black leading-tight tracking-[-0.5px] mb-2">
                    {product.name}
                </h1>
                <p className="font-['Fraunces'] text-[28px] font-bold text-[#E8303A] mb-3">
                    {Number(product.price).toLocaleString()} FCFA
                </p>
                {product.shortDescription && (
                    <p className="text-[14px] text-[#9B9590] leading-relaxed">
                        {product.shortDescription}
                    </p>
                )}
            </div>

            {/* Divider */}
            <div className="h-px bg-[#EBEBE6] mx-4 mb-5" />

            {/* Variantes */}
            {hasVariants && (
                <VariantPicker
                    availableColors={availableColors}
                    availableSizes={availableSizes}
                    selectedColor={selectedColor}
                    selectedSize={selectedSize}
                    onColorSelect={setSelectedColor}
                    onSizeSelect={setSelectedSize}
                    showError={showError}
                />
            )}

            {/* Espace pour la sticky bar */}
            <div className="h-6" />
            {/* Sticky bar */}
            <StickyBar
                quantity={quantity}
                totalPrice={totalPrice}
                isReady={isReady}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                onOrder={handleOrder}
                onAddToCart={handleAddToCart}
            />
            {/* ✅ Bottom sheet — en dehors du flux normal */}
            <OrderBottomSheet />

            {/* ✅ Social proof — activité en temps réel */}
            <SocialProofToast />

        </div>
    )
}