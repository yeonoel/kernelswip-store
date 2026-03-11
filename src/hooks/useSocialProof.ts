import { useState, useEffect } from 'react'

const NOMS_CI = ["Kouassi", "Adjoua", "Koné", "Bamba", "Diabaté", "Yao", "N'Guessan", "Traoré", "Coulibaly", "Ahou", "Harouna"]

interface SocialProofMessage {
    id: number
    text: string
    emoji: string
}

function randomName() {
    return NOMS_CI[Math.floor(Math.random() * NOMS_CI.length)]
}

function randomViewers() {
    return Math.floor(3 + Math.random() * 8)
}

function randomMinutes() {
    return Math.floor(1 + Math.random() * 9)
}

export function useSocialProof() {
    const [message, setMessage] = useState<SocialProofMessage | null>(null)
    const [visible, setVisible] = useState(false)
    const [counter, setCounter] = useState(0)

    const messages = [
        { emoji: "👀", text: `${randomViewers()} personnes regardent cette boutique` },
        { emoji: "✅", text: `${randomName()} vient de commander il y a ${randomMinutes()} min` },
        { emoji: "🔥", text: `${randomName()} et ${randomViewers()} autres ont commandé aujourd'hui` },
        { emoji: "👀", text: `${randomViewers()} personnes regardent en ce moment` },
        { emoji: "✅", text: `${randomName()} vient de passer commande` },
    ]

    useEffect(() => {
        // Première notification après 1min
        const first = setTimeout(() => showNext(), 10000)
        return () => clearTimeout(first)
    }, [])

    function showNext() {
        const msg = messages[Math.floor(Math.random() * messages.length)]
        setMessage({ id: Date.now(), ...msg })
        setVisible(true)
        setCounter(c => c + 1)

        // Cache après 4s
        setTimeout(() => setVisible(false), 4000)

        // Prochaine notification dans 12-20s
        const next = 180000 + Math.random() * 60000
        setTimeout(() => showNext(), next)
    }

    return { message, visible }
}