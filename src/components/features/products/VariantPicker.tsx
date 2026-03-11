interface VariantPickerProps {
    availableColors: string[]
    availableSizes: string[]
    selectedColor: string | null
    selectedSize: string | null
    onColorSelect: (color: string) => void
    onSizeSelect: (size: string) => void
    showError: boolean  // true quand client appuie sans choisir
}

export default function VariantPicker({
    availableColors, availableSizes,
    selectedColor, selectedSize,
    onColorSelect, onSizeSelect,
    showError,
}: VariantPickerProps) {
    return (
        <div className="px-4 space-y-5">

            {/* Couleurs */}
            {availableColors.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-['Fraunces'] text-[12px] font-bold uppercase tracking-widest text-[#111010]">
                            Couleur
                        </span>
                        {selectedColor ? (
                            <span className="text-[11px] font-semibold bg-green-50 text-green-600 px-2.5 py-1 rounded-full">
                                {selectedColor}
                            </span>
                        ) : (
                            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors ${showError
                                ? 'bg-red-50 text-[#E8303A]'
                                : 'bg-[#FAF8F5] text-[#9B9590]'
                                }`}>
                                Choisir
                            </span>
                        )}
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        {availableColors.map((color, i) => (
                            <button
                                key={i}
                                onClick={() => onColorSelect(color)}
                                className={`w-9 h-9 rounded-full border-[2.5px] transition-all active:scale-110 ${selectedColor === color
                                    ? 'border-[#111010] scale-110 shadow-[0_0_0_3px_rgba(17,16,16,0.12)]'
                                    : showError
                                        ? 'border-[#E8303A]/50'
                                        : 'border-black/10'
                                    }`}
                                style={{ background: color }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Tailles */}
            {availableSizes.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-['Fraunces'] text-[12px] font-bold uppercase tracking-widest text-[#111010]">
                            Taille
                        </span>
                        {selectedSize ? (
                            <span className="text-[11px] font-semibold bg-green-50 text-green-600 px-2.5 py-1 rounded-full">
                                {selectedSize}
                            </span>
                        ) : (
                            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors ${showError
                                ? 'bg-red-50 text-[#E8303A]'
                                : 'bg-[#FAF8F5] text-[#9B9590]'
                                }`}>
                                Choisir
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {availableSizes.map((size, i) => (
                            <button
                                key={i}
                                onClick={() => onSizeSelect(size)}
                                className={`min-w-[48px] h-[46px] px-3 rounded-xl font-['Fraunces'] text-[14px] font-bold transition-all active:scale-105 ${selectedSize === size
                                    ? 'bg-[#111010] text-white border-[#111010] shadow-[0_4px_16px_rgba(17,16,16,0.2)]'
                                    : showError
                                        ? 'bg-white text-[#111010] border-[1.5px] border-[#E8303A]/50'
                                        : 'bg-[#FAF8F5] text-[#111010] border-[1.5px] border-[#EBEBE6]'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}