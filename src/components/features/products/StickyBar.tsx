interface StickyBarProps {
    quantity: number
    totalPrice: string
    isReady: boolean
    onIncrease: () => void
    onDecrease: () => void
    onOrder: () => void
    onAddToCart: () => void
}

export default function StickyBar({ quantity, totalPrice, isReady, onIncrease, onDecrease, onOrder, onAddToCart }: StickyBarProps) {
    return (
        <div className="sticky bottom-0 bg-white/97 backdrop-blur-xl border-t border-[#EBEBE6] px-4 pt-3 pb-8">
            <div className="flex items-center gap-3">

                {/* Quantité */}
                <div className="flex items-center bg-[#FAF8F5] border-[1.5px] border-[#EBEBE6] rounded-xl overflow-hidden flex-shrink-0">
                    <button
                        onClick={onDecrease}
                        className="w-10 h-12 flex items-center justify-center text-xl font-light text-[#111010] active:bg-[#EBEBE6] transition-colors"
                    >
                        −
                    </button>
                    <span className="w-8 text-center font-['Fraunces'] text-[17px] font-bold">
                        {quantity}
                    </span>
                    <button
                        onClick={onIncrease}
                        className="w-10 h-12 flex items-center justify-center text-xl font-light text-[#111010] active:bg-[#EBEBE6] transition-colors"
                    >
                        +
                    </button>
                </div>

                {/* Bouton Commander */}
                <button
                    onClick={onOrder}
                    disabled={!isReady}
                    className={`flex-1 h-12 rounded-2xl font-['Fraunces'] text-[15px] font-bold transition-all ${isReady
                        ? 'bg-[#E8303A] text-white shadow-[0_4px_20px_rgba(232,48,58,0.35)] active:scale-[0.97]'
                        : 'bg-[#EBEBE6] text-[#9B9590] cursor-not-allowed'
                        }`}
                >
                    {isReady ? `Commander · ${totalPrice}` : 'Commander'}
                </button>

                {/* Bouton Panier */}
                <button
                    onClick={onAddToCart}
                    disabled={!isReady}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all ${isReady
                        ? 'bg-[#FAF8F5] border-[1.5px] border-[#EBEBE6] active:scale-[0.88] active:bg-[#EBEBE6]'
                        : 'bg-[#EBEBE6] opacity-40 cursor-not-allowed'
                        }`}
                >
                    🛒
                </button>

            </div>
        </div>
    )
}