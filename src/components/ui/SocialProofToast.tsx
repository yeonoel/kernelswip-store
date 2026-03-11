import { useSocialProof } from '../../hooks/useSocialProof'

export default function SocialProofToast() {
    const { message, visible } = useSocialProof()

    if (!message) return null

    return (
        <div
            className={`fixed top-24 left-4 right-16 z-[90] transition-all duration-500 ${visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
        >
            <div className="bg-white border border-[#EBEBE6] rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.1)] flex items-center gap-3 max-w-xs">
                {/* Emoji */}
                <span className="text-xl flex-shrink-0">{message.emoji}</span>

                {/* Texte */}
                <p className="text-[13px] font-medium text-[#111010] leading-tight flex-1">
                    {message.text}
                </p>

                {/* Point vert live */}
                <div className="flex-shrink-0 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
            </div>
        </div>
    )
}