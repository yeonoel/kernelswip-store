# Swip — Frontend React

Interface mobile-first pour vendeurs Facebook/TikTok en Côte d'Ivoire 🇨🇮

---

## Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **React Router v6** — navigation
- **TanStack Query** — fetching données serveur
- **Zustand** — état global (panier, commande)

---

## Installation

```bash
git clone https://github.com/ton-repo/swip-frontend
cd swip-frontend
npm install
npm run dev
```

---

## Variables d'environnement

Crée un fichier `.env` à la racine :

```env
VITE_API_URL=https://ton-api.com
```

---

## Structure du projet

```
src/
├── components/
│   ├── Header/           # Header boutique (logo + vendeur + panier)
│   ├── grid/             # ProductGrid + ProductCard
│   ├── product/          # Carousel, VariantPicker, StickyBar
│   ├── modals/           # OrderBottomSheet (commande + OTP)
│   ├── layout/           # MainLayout
│   └── ui/               # WhatsAppButton, SocialProofToast
│
├── pages/
│   ├── productsGrid/     # Liste des produits
│   ├── productDetails/   # Détail produit
│   ├── RouteRedirect/    # Redirige vers dernière boutique visitée
│   └── not-found/        # Page 404
│
├── hooks/
│   ├── useProducts.ts    # Fetch produits par boutique
│   ├── useVariantSelector.ts  # Logique couleur + taille
│   ├── useCreateOrder.ts # Mutation commande
│   ├── useOtp.ts         # Génération + vérification code OTP
│   └── useSocialProof.ts # Notifications activité en temps réel
│
├── store/
│   └── useOrderStore.ts  # État commande (Zustand)
│
├── services/
│   └── ordersService.ts  # Appels API commandes
│
├── data/
│   └── abidjan.ts        # Communes + quartiers d'Abidjan
│
├── utils/
│   └── phone.ts          # Validation + normalisation numéro ivoirien
│
└── types/
    ├── product.ts         # Product, ProductVariant, ProductImage...
    └── order.ts           # CreateOrderDto, OrderDto...
```

---

## Routes

```
/                          → Redirige vers dernière boutique (localStorage)
/:storeSlug                → Grille produits de la boutique
/:storeSlug/produit/:slug  → Détail produit
*                          → Page 404
```

---

## Flow commande

```
Client voit produit
  → Choisit couleur + taille
  → Clique "Commander"
  → Bottom sheet s'ouvre
      Étape 1 : Numéro WhatsApp (validation format ivoirien)
      Étape 2 : Commune de livraison
      Étape 3 : Quartier de livraison
      Étape 4 : Récapitulatif + confirmation
  → Commande envoyée au backend
  → Écran succès ✓
```

---

## Validation numéro ivoirien

Les formats acceptés sont :

```
07XXXXXXXX
+22507XXXXXXXX
22507XXXXXXXX
```

Tous normalisés vers `+225XXXXXXXXXX` avant envoi au backend.

---

## SMS OTP

Actuellement simulé via `alert()` en développement.

Pour la production, remplacer dans `src/hooks/useOtp.ts` :

```ts
// 🚧 Remplacer cette ligne
alert(`Code : ${code}`)

// ✅ Par un appel AfricasTalking ou Orange CI
await smsService.send({ to: phone, message: `Votre code Swip : ${code}` })
```

---

## Multi-boutique

Chaque boutique est identifiée par son `storeSlug` dans l'URL.  
Le slug est automatiquement sauvegardé en `localStorage` pour rediriger l'acheteur à sa prochaine visite.

---

## Scripts

```bash
npm run dev      # Développement
npm run build    # Build production
npm run preview  # Prévisualiser le build
```
