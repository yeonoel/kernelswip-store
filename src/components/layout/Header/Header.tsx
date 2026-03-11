// src/components/Header/Header.tsx

interface HeaderProps {
    vendorInitial: string
    vendorHandle: string
    vendorSub: string
    isLive?: boolean
    cartCount?: number
    onCartClick?: () => void
}

export default function Header({
    vendorInitial,
    vendorHandle,
    vendorSub,
    isLive = false,
    cartCount = 0,
    onCartClick,
}: HeaderProps) {
    return (
        <div className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-xl border-b border-[#EBEBE6] px-4 pt-3 pb-2.5">

            {/* Ligne 1 — Logo + Panier */}
            <div className="flex items-center justify-between mb-3">

                {/* Logo */}
                <h1 className="font-['Fraunces'] text-[28px] font-black tracking-[-1.5px] leading-none text-[#111010]">
                    swi<em className="text-[#E8303A] font-black">p</em>
                </h1>

                {/* Bouton panier */}
                <button
                    onClick={onCartClick}
                    className="flex items-center gap-2 bg-[#111010] text-white px-4 py-2 rounded-full text-[13px] font-semibold transition active:scale-95"
                >
                    🛒 Panier
                    {cartCount > 0 && (
                        <span className="bg-[#E8303A] text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </button>

            </div>

            {/* Ligne 2 — Infos vendeur */}
            <div className="flex items-center gap-2.5">

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E8303A] to-[#ff7043] flex items-center justify-center text-white font-['Fraunces'] text-sm font-black flex-shrink-0">
                    {vendorInitial}
                </div>

                {/* Nom + sous-titre */}
                <div>
                    <p className="text-sm font-semibold leading-tight">{vendorHandle}</p>
                    <p className="text-[11px] text-[#9B9590] leading-tight">{vendorSub}</p>
                </div>

                {/* Badge LIVE */}
                {isLive && (
                    <div className="ml-auto flex items-center gap-1.5 bg-[#E8303A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        LIVE
                    </div>
                )}

            </div>
        </div>
    )
}