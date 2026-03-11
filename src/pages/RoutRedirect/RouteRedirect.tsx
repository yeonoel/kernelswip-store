
import { Navigate } from 'react-router-dom'
import SwipHomePage from '../SwipHomePage/swipHomePage'

export default function RootRedirect() {

    const lastStore = localStorage.getItem('storeSlug');

    // Si l'acheteur a déjà visité une boutique → on le redirige
    if (lastStore) {
        return <Navigate to={`/${lastStore}`} replace />
    }

    // Sinon → page d'accueil Swip
    return <SwipHomePage />
}