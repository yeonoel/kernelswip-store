import { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useOrderStore } from '../../hooks/useOrdersStore'
import { useCreateOrder } from '../../hooks/useCreateOrder'
import { ABIDJAN, COMMUNES } from '../../data'
import { isValidIvorianPhone, normalizeIvorianPhone } from '../../lib/phone'
import { useOtp } from '../../hooks/useOtp'

export default function OrderBottomSheet() {
    const { storeSlug } = useParams<{ storeSlug: string }>()
    const {
        step, item, phone, commune, quartier,
        setPhone, setCommune, setQuartier,
        closeOrder, goTo,
    } = useOrderStore();

    const { sendCode, verifyCode, resend, timer } = useOtp()
    const { submitOrder, isLoading, data } = useCreateOrder(storeSlug!)

    const [otp, setOtp] = useState(['', '', '', ''])
    const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

    const isOpen = ['phone', 'commune', 'quartier', 'confirm', 'success'].includes(step)
    const isPhoneValid = isValidIvorianPhone(phone)

    // Indicateur de progression
    const stepIndex = { phone: 1, commune: 2, quartier: 3, confirm: 4, success: 4 }
    const currentStep = stepIndex[step as keyof typeof stepIndex] ?? 0

    useEffect(() => {
        if (step === 'phone') setOtp(['', '', '', ''])
        if (step === 'commune') window.scrollTo(0, 0)
    }, [step])

    useEffect(() => {
        if (step === 'phone') setTimeout(() => inputRefs[0].current?.focus(), 400)
    }, [step])

    // ── Handlers OTP
    function handleSendCode() {
        sendCode(phone)
        goTo('commune')  // OTP simulé → on passe directement
        // En prod → goTo('otp') et attendre validation avant commune
    }


    function handleOtpKeyDown(e: React.KeyboardEvent, index: number) {
        if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs[index - 1].current?.focus()
    }

    if (!item) return null;

    const totalPrice = (Number(item.product.price) * item.quantity).toLocaleString()
    const normalizedPhone = normalizeIvorianPhone(phone)

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeOrder}
            />

            {/* Sheet */}
            <div className={`fixed bottom-0 left-0 right-0 z-[300] bg-white rounded-t-3xl transition-transform duration-500 ease-[cubic-bezier(.77,0,.18,1)] max-h-[92vh] overflow-y-auto ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>

                {/* Handle + progress */}
                <div className="sticky top-0 bg-white pt-3 pb-3 px-5 border-b border-[#EBEBE6] z-10">
                    <div className="w-9 h-1 bg-[#EBEBE6] rounded-full mx-auto mb-3" />

                    {/* Barre de progression */}
                    {step !== 'success' && (
                        <div className="flex items-center gap-2">
                            {['Numéro', 'Commune', 'Quartier', 'Confirmer'].map((label, i) => (
                                <div key={i} className="flex items-center gap-2 flex-1">
                                    <div className={`flex-1 h-1 rounded-full transition-all duration-300 ${i < currentStep ? 'bg-[#E8303A]' : 'bg-[#EBEBE6]'}`} />
                                    {i === 3 && (
                                        <span className={`text-[10px] font-bold ${currentStep > i ? 'text-[#E8303A]' : 'text-[#9B9590]'}`}>
                                            {label}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="px-5 pb-10 pt-4">

                    {/* Résumé produit — toujours visible */}
                    {step !== 'success' && (
                        <div className="flex items-center gap-3 bg-[#FAF8F5] rounded-2xl p-3 mb-6">
                            <div
                                className="w-14 h-14 rounded-xl bg-[#f0eeeb] flex-shrink-0 bg-cover bg-center border border-[#EBEBE6]"
                                style={{ backgroundImage: `url('${item.product.images.find(i => i.isPrimary)?.imageUrl ?? item.product.images[0]?.imageUrl}')` }}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="font-['Fraunces'] text-[14px] font-bold truncate">{item.product.name}</p>
                                <p className="text-[12px] text-[#9B9590] mt-0.5">
                                    {[item.color, item.size, `Qté ${item.quantity}`].filter(Boolean).join(' · ')}
                                </p>
                            </div>
                            <p className="font-['Fraunces'] text-[16px] font-bold text-[#E8303A] flex-shrink-0">
                                {totalPrice} FCFA
                            </p>
                        </div>
                    )}

                    {/* ══ STEP 1 — Numéro ══ */}
                    {step === 'phone' && (
                        <div>
                            <h2 className="font-['Fraunces'] text-[22px] font-black mb-1">Ton numéro 📱</h2>
                            <p className="text-[13px] text-[#9B9590] mb-5 leading-relaxed">
                                Entre ton numéro WhatsApp — tu recevras la confirmation de ta commande.<br />
                                <strong className="text-[#111010]">Tu paies uniquement à la livraison.</strong>
                            </p>

                            <div className={`flex items-center gap-3 bg-[#FAF8F5] border-[1.5px] rounded-2xl px-4 py-3 mb-2 transition-colors ${isPhoneValid ? 'border-green-400' : 'border-[#EBEBE6]'} focus-within:border-[#111010]`}>
                                <span className="text-2xl">🇨🇮</span>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="07 XX XX XX XX"
                                    maxLength={17}
                                    className="flex-1 bg-transparent outline-none text-[17px] font-medium placeholder:text-[#9B9590]"
                                />
                                {isPhoneValid && <span className="text-green-500 text-lg">✓</span>}
                            </div>

                            <p className="text-[11px] text-[#9B9590] mb-6 px-1">
                                Formats acceptés : 07XXXXXXXX · +22507XXXXXXXX
                            </p>

                            <button
                                onClick={handleSendCode}
                                disabled={!isPhoneValid}
                                className={`w-full py-4 rounded-2xl font-['Fraunces'] text-[16px] font-bold transition-all ${isPhoneValid ? 'bg-[#111010] text-white shadow-[0_4px_20px_rgba(17,16,16,0.2)] active:scale-[0.97]' : 'bg-[#EBEBE6] text-[#9B9590] cursor-not-allowed'}`}
                            >
                                Continuer →
                            </button>
                        </div>
                    )}

                    {/* ══ STEP 2 — Commune ══ */}
                    {step === 'commune' && (
                        <div>
                            <h2 className="font-['Fraunces'] text-[22px] font-black mb-1">Ta commune 📍</h2>
                            <p className="text-[13px] text-[#9B9590] mb-5">Sélectionne ta commune de livraison</p>

                            <div className="flex flex-wrap gap-2">
                                {COMMUNES.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => { setCommune(c); goTo('quartier') }}
                                        className={`px-4 py-2.5 rounded-xl font-['Fraunces'] text-[13px] font-bold border-[1.5px] transition-all active:scale-95 ${commune === c
                                            ? 'bg-[#111010] text-white border-[#111010]'
                                            : 'bg-white text-[#111010] border-[#EBEBE6]'
                                            }`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ══ STEP 3 — Quartier ══ */}
                    {step === 'quartier' && commune && (
                        <div>
                            <button onClick={() => goTo('commune')} className="flex items-center gap-2 text-[13px] text-[#9B9590] mb-4 active:opacity-70">
                                ← {commune}
                            </button>
                            <h2 className="font-['Fraunces'] text-[22px] font-black mb-1">Ton quartier 🏘️</h2>
                            <p className="text-[13px] text-[#9B9590] mb-5">Quartier de livraison à {commune}</p>

                            <div className="flex flex-wrap gap-2">
                                {ABIDJAN[commune].map(q => (
                                    <button
                                        key={q}
                                        onClick={() => { setQuartier(q); goTo('confirm') }}
                                        className={`px-4 py-2.5 rounded-xl font-['Fraunces'] text-[13px] font-bold border-[1.5px] transition-all active:scale-95 ${quartier === q
                                            ? 'bg-[#111010] text-white border-[#111010]'
                                            : 'bg-white text-[#111010] border-[#EBEBE6]'
                                            }`}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ══ STEP 4 — Confirmation ══ */}
                    {step === 'confirm' && (
                        <div>
                            <h2 className="font-['Fraunces'] text-[22px] font-black mb-5">Récapitulatif ✅</h2>

                            {/* Infos de livraison */}
                            <div className="bg-[#FAF8F5] rounded-2xl p-4 mb-5 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[13px] text-[#9B9590]">Numéro</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[14px] font-semibold">{normalizedPhone}</span>
                                        <button onClick={() => goTo('phone')} className="text-[11px] text-[#E8303A] underline">Modifier</button>
                                    </div>
                                </div>
                                <div className="h-px bg-[#EBEBE6]" />
                                <div className="flex justify-between items-center">
                                    <span className="text-[13px] text-[#9B9590]">Commune</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[14px] font-semibold">{commune}</span>
                                        <button onClick={() => goTo('commune')} className="text-[11px] text-[#E8303A] underline">Modifier</button>
                                    </div>
                                </div>
                                <div className="h-px bg-[#EBEBE6]" />
                                <div className="flex justify-between items-center">
                                    <span className="text-[13px] text-[#9B9590]">Quartier</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[14px] font-semibold">{quartier}</span>
                                        <button onClick={() => goTo('quartier')} className="text-[11px] text-[#E8303A] underline">Modifier</button>
                                    </div>
                                </div>
                                <div className="h-px bg-[#EBEBE6]" />
                                <div className="flex justify-between items-center">
                                    <span className="text-[13px] text-[#9B9590]">Paiement</span>
                                    <span className="text-[14px] font-semibold">💵 Cash à la livraison</span>
                                </div>
                                <div className="h-px bg-[#EBEBE6]" />
                                <div className="flex justify-between items-center">
                                    <span className="text-[13px] text-[#9B9590] font-bold">Total</span>
                                    <span className="font-['Fraunces'] text-[20px] font-black text-[#E8303A]">{totalPrice} FCFA</span>
                                </div>
                            </div>

                            <button
                                onClick={submitOrder}
                                disabled={isLoading}
                                className="w-full py-4 rounded-2xl font-['Fraunces'] text-[16px] font-bold bg-[#E8303A] text-white shadow-[0_4px_20px_rgba(232,48,58,0.35)] active:scale-[0.97] transition-all disabled:opacity-60"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Envoi en cours...
                                    </span>
                                ) : (
                                    '✓ Confirmer ma commande'
                                )}
                            </button>

                            <p className="text-center text-[12px] text-[#9B9590] mt-3">
                                💵 Tu paies uniquement à la réception — aucun paiement maintenant
                            </p>
                        </div>
                    )}

                    {/* ══ SUCCESS ══ */}

                    {step === 'success' && (
                        <div className="flex flex-col items-center text-center py-6 px-4">
                            {/* L'icône qui clignote un peu pour attirer l'œil */}
                            <div className="w-20 h-20 rounded-full bg-[#E8F5E9] border-2 border-[#25D366] flex items-center justify-center text-3xl mb-6 shadow-sm animate-pulse">
                                ✅
                            </div>

                            <h2 className="font-['Fraunces'] text-[24px] font-black mb-2 text-[#111010]">
                                C'est presque dans tes mains ! 🎁
                            </h2>

                            <p className="text-[14px] text-[#9B9590] leading-relaxed mb-8 px-2">
                                Ta commande est bien réservée. On attend juste ton <strong className="text-[#111010]">"OK"</strong> Sur WhatsApp pour convenir de la date de livraison à <strong className="text-[#111010]">{quartier}</strong>.
                            </p>

                            <div className="w-full space-y-4">
                                {/* BOUTON PRINCIPAL : VALIDATION */}
                                <a
                                    href={`https://wa.me/${+15551804841}?text=${encodeURIComponent(
                                        `Bonjour, je confirme ma commande #${data?.orderNumber} sur [${storeSlug}] pour livraison à ${quartier}, ${commune}. \n Je confirme mon choix à 100%. Je veux vraiment cet article, vous pouvez préparer mon colis ! 🎁`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-['Fraunces'] text-[17px] font-black shadow-[0_8px_20px_rgba(37,211,102,0.3)] active:scale-[0.97] transition-all flex items-center justify-center gap-3"
                                >
                                    Confirmer sur WhatsApp 📲
                                </a>

                                {/* BOUTON SECONDAIRE : ANNULATION (Le filtre doux) */}
                                <button
                                    onClick={closeOrder}
                                    className="w-full py-3 text-[13px] text-[#9B9590] font-bold hover:text-[#E8303A] transition-colors"
                                >
                                    Non, je vais réfléchir un peu ↩️
                                </button>
                            </div>

                            <div className="mt-10 flex items-center gap-2 opacity-50">
                                <span className="h-px w-8 bg-[#9B9590]"></span>
                                <p className="text-[10px] uppercase tracking-widest font-black text-[#9B9590]">
                                    Paiement à la livraison · Shopall
                                </p>
                                <span className="h-px w-8 bg-[#9B9590]"></span>
                            </div>
                        </div>
                    )}

                </div>
            </div >
        </>
    )
}