
import { Outlet, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export default function MainLayout() {
    const { storeSlug } = useParams<{ storeSlug: string }>()

    // Dès que l'acheteur arrive sur une boutique → on mémorise
    useEffect(() => {
        if (storeSlug) {
            localStorage.setItem("storeSlug", storeSlug)
        }
    }, [storeSlug])


    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            {/* Les pages enfants s'affichent ici */}
            <Outlet />
        </div>
    )
}