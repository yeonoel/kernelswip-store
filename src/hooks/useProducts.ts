import { useQuery } from '@tanstack/react-query';
import { productsService } from '../service/products/api.service';


export const productKeys = {
    all: (storeSlug: string) => ['products', storeSlug] as const,
    detail: (storeSlug: string, slug: string) => ['products', storeSlug, slug] as const,
};

export function useProducts(storeSlug: string) {
    return useQuery({
        queryKey: productKeys.all(storeSlug),
        queryFn: () => productsService.getAll(storeSlug),
        select: (data) => ({
            products: data.data,
            meta: data.meta,
        }),
        staleTime: 1000 * 60 * 2,
    });
}

export function useProduct(storeSlug: string, productSlug: string) {
    return useQuery({
        queryKey: productKeys.detail(storeSlug, productSlug),
        queryFn: () => productsService.getBySlug(storeSlug, productSlug),
        select: (data) => data.data,
        staleTime: 1000 * 60 * 2,
        enabled: !!productSlug,
    });
}

