interface WhatsAppValidationProps {
    orderId?: string;
    storeSlug?: string;
    quartier?: string;
    commune?: string;
    totalAmount: string;
}
import React from 'react';

const WhatsAppValidation = ({ orderId, storeSlug, quartier, commune, totalAmount }: WhatsAppValidationProps) => {
    // 1. TON NUMÉRO OFFICIEL (Celui configuré dans Meta, sans le +)
    const whatsappNumber = "2250747492156";

    // 2. LE MESSAGE PRÉ-REMPLI (Crucial pour ton Webhook NestJS)
    // On utilise le format #ID et [SLUG] que ton backend sait lire
    const message = `Bonjour, je confirme ma commande #${orderId} sur [${storeSlug}] pour livraison à ${quartier}, ${commune}. Montant: ${totalAmount} FCFA.`;

    const whatsappUrl = `https://wa.me{whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-[#F5F2F0]">
            {/* Icône animée */}
            <div className="w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center text-4xl mb-6 shadow-[0_0_0_12px_rgba(37,211,102,0.1)] animate-pulse">
                📲
            </div>

            <h2 className="font-['Fraunces'] text-[26px] font-black mb-3 text-[#111010]">
                Dernière étape !
            </h2>

            <p className="text-[15px] text-[#9B9590] leading-relaxed mb-8 px-4">
                Ta commande est prête. Pour éviter les erreurs, clique sur le bouton ci-dessous pour la <strong className="text-[#111010]">valider sur WhatsApp</strong>.
            </p>

            {/* LE BOUTON DE VALIDATION (L'arme anti-plaisantin) */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#111010] text-white flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-[16px] active:scale-[0.97] transition-all hover:bg-[#25D366] hover:shadow-xl group"
            >
                <svg className="w-6 h-6 fill-current group-hover:animate-bounce" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Confirmer via WhatsApp
            </a>

            <p className="mt-6 text-[12px] text-[#9B9590]">
                La validation est instantanée et gratuite.
            </p>
        </div>
    );
};

export default WhatsAppValidation;

