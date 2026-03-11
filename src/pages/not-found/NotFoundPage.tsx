// src/pages/not-found/NotFoundPage.tsx

import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">

            {/* Emoji sneaker animé */}
            <div className="text-8xl mb-6 animate-bounce">👟</div>

            {/* Code */}
            <span className="text-xs font-bold tracking-widest text-orange-400 uppercase mb-2">
                Erreur 404
            </span>

            {/* Titre */}
            <h1 className="text-3xl font-black text-gray-900 mb-3 leading-tight">
                Cette page s'est<br />envolée
            </h1>

            {/* Sous-titre */}
            <p className="text-gray-400 text-sm max-w-xs mb-8">
                La page que vous cherchez n'existe pas ou a été déplacée.
                Retournez voir nos sneakers 🔥
            </p>

            {/* CTA */}
            <button
                onClick={() => navigate(-1)}
                className="bg-orange-500 hover:bg-orange-400 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/25"
            >
                ← Retour
            </button>
        </div>
    );
}