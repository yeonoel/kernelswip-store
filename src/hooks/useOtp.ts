// src/hooks/useOtp.ts

import { useState, useRef, useCallback } from 'react'

export function useOtp() {
    const [timer, setTimer] = useState(0)
    const [generatedCode, setGeneratedCode] = useState('')
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const sendCode = useCallback((phone: string) => {
        const code = String(Math.floor(1000 + Math.random() * 9000))
        setGeneratedCode(code)

        // 🚧 Simulation — en prod on appelle AfricasTalking ici
        // await africasTalking.sms.send({ to: phone, message: `Votre code Swip : ${code}` })
        console.log(`📱 SMS simulé → ${phone} : Votre code Swip est ${code}`)
        alert(`📱 SMS simulé\nCode envoyé au ${phone} :\n\n${code}\n\n(En production → vrai SMS)`)

        // Timer 60s
        setTimer(60)
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setTimer(t => {
                if (t <= 1) {
                    clearInterval(intervalRef.current!)
                    return 0
                }
                return t - 1
            })
        }, 1000)

        return code
    }, [])

    const verifyCode = useCallback((entered: string) => {
        return entered === generatedCode
    }, [generatedCode])

    const resend = useCallback((phone: string) => {
        return sendCode(phone)
    }, [sendCode])

    const clearTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setTimer(0)
    }, [])

    return {
        sendCode,
        verifyCode,
        resend,
        clearTimer,
        timer,
        generatedCode, // utile pour debug en dev
    }
}