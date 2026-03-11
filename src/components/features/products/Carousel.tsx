import { useState, useRef } from 'react'
import type { ProductImage } from '../../../types/products.type'

interface CarouselProps {
    images: ProductImage[]
}

export default function Carousel({ images }: CarouselProps) {
    const [current, setCurrent] = useState(0)
    const [lightbox, setLightbox] = useState(false)
    const [lbIndex, setLbIndex] = useState(0)
    const touchStartX = useRef(0)

    const sorted = [...images].sort((a, b) => a.displayOrder - b.displayOrder)

    function handleSwipe(dir: 1 | -1) {
        setCurrent(c => Math.max(0, Math.min(sorted.length - 1, c + dir)))
    }

    function openLightbox(idx: number) {
        setLbIndex(idx)
        setLightbox(true)
    }

    return (
        <>
            {/* ── Carousel principal ── */}
            <div
                className="relative w-full aspect-square bg-[#f0eeeb] overflow-hidden cursor-zoom-in"
                onTouchStart={e => touchStartX.current = e.touches[0].clientX}
                onTouchEnd={e => {
                    const dx = touchStartX.current - e.changedTouches[0].clientX
                    if (Math.abs(dx) > 40) handleSwipe(dx > 0 ? 1 : -1)
                    else if (Math.abs(dx) < 5) openLightbox(current)
                }}
                onClick={() => openLightbox(current)}
            >
                {/* Track */}
                <div
                    className="flex h-full transition-transform duration-300 ease-[cubic-bezier(.77,0,.18,1)]"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {sorted.map(img => (
                        <div key={img.id} className="min-w-full h-full flex-shrink-0">
                            <img
                                src={img.imageUrl}
                                alt={img.altText}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>

                {/* Dots */}
                {sorted.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {sorted.map((_, i) => (
                            <div
                                key={i}
                                className={`h-[5px] rounded-full transition-all duration-250 ${i === current
                                    ? 'w-4 bg-white'
                                    : 'w-[5px] bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* Compteur */}
                {sorted.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur text-white text-[10px] font-semibold px-2 py-1 rounded-lg">
                        {current + 1} / {sorted.length}
                    </div>
                )}
            </div>

            {/* ── Lightbox ── */}
            {lightbox && (
                <div className="fixed inset-0 z-[500] bg-black flex flex-col">

                    {/* Top bar */}
                    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
                        <button
                            onClick={() => setLightbox(false)}
                            className="w-9 h-9 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white text-lg"
                        >
                            ✕
                        </button>
                        <span className="font-['Fraunces'] text-white/70 text-sm font-bold">
                            {lbIndex + 1} / {sorted.length}
                        </span>
                        <div className="w-9" />
                    </div>

                    {/* Track lightbox */}
                    <div
                        className="flex-1 overflow-hidden flex items-center"
                        onTouchStart={e => touchStartX.current = e.touches[0].clientX}
                        onTouchEnd={e => {
                            const dx = touchStartX.current - e.changedTouches[0].clientX
                            if (Math.abs(dx) > 40)
                                setLbIndex(i => Math.max(0, Math.min(sorted.length - 1, i + (dx > 0 ? 1 : -1))))
                        }}
                    >
                        <div
                            className="flex h-full transition-transform duration-300"
                            style={{ transform: `translateX(-${lbIndex * 100}vw)` }}
                        >
                            {sorted.map(img => (
                                <div key={img.id} className="min-w-[100vw] h-full flex items-center justify-center p-4">
                                    <img
                                        src={img.imageUrl}
                                        alt={img.altText}
                                        className="max-w-full max-h-full object-contain"
                                        draggable={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots lightbox */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        {sorted.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all ${i === lbIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/30'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}