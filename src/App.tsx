import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from './context/CartsContext'
import ProductsGridPage from './pages/productsGrid/ProductsGridPage'
import { NotFoundPage } from './pages/not-found/NotFoundPage'
import RootRedirect from './pages/RoutRedirect/RouteRedirect'
import MainLayout from './components/layout/MainLayout/mainLayout'
import ProductDetails from './pages/productDetails/productDetails'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 2, retry: 1 },
  },
})

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CartProvider>
            <Routes>

              {/* Racine — redirige vers dernière boutique visitée */}
              <Route path="/" element={<RootRedirect />} />

              {/* Boutique */}
              <Route path="/:storeSlug" element={<MainLayout />}>
                <Route index element={<ProductsGridPage />} />
                <Route path="produit/:productSlug" element={<ProductDetails />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />

            </Routes>
          </CartProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}