// src/components/Header/Header.tsx

import { useStoreMangment } from "../../../hooks/useStoreMangment"

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
    const { data: store } = useStoreMangment();
    console.log("Store data in Header:", store?.name);
    return (
        <div className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-xl border-b border-[#EBEBE6] px-4 pt-3 pb-2.5">

            {/* Ligne 1 — Logo + Panier */}
            <div className="flex items-center justify-between mb-3">

                {/* Logo ou Initiale + Nom */}
                <div className="flex items-center gap-2">
                    {store?.logoUrl ? (
                        <>
                            <img
                                src={store.logoUrl}
                                alt={store.name}
                                className="h-8 w-auto object-contain"
                            />
                            <span className="font-semibold text-[15px] text-[#111010]">{store.name}</span>
                        </>
                    ) : (
                        <>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E8303A] to-[#ff7043] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                                {vendorInitial}
                            </div>
                            <span className="font-semibold text-[15px] text-[#111010]">{store?.name}</span>
                        </>
                    )}
                </div>

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
        </div>
    )
}