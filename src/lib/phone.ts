// src/utils/phone.ts

export function normalizeIvorianPhone(raw: string): string | null {
    // Supprime espaces, tirets, points
    const cleaned = raw.replace(/[\s\-\.]/g, '')

    // Formats acceptés → on normalise vers +225XXXXXXXXXX
    if (/^\+225\d{10}$/.test(cleaned)) return cleaned
    if (/^225\d{10}$/.test(cleaned)) return `+${cleaned}`
    if (/^0[0-9]{9}$/.test(cleaned)) return `+225${cleaned}`

    return null  // invalide
}

export function isValidIvorianPhone(raw: string): boolean {
    return normalizeIvorianPhone(raw) !== null
}