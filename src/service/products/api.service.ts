import apiClient from "../../api/client";
import type { ProductDetailResponse, ProductsResponse } from "../../types/products.type";

export const productsService = {
    getAll: async (storeSlug: string, page = 1, limit = 20): Promise<ProductsResponse> => {
        const { data } = await apiClient.get<ProductsResponse>(`/${storeSlug}/products`, { params: { page, limit } })
        return data
    },

    getBySlug: async (storeSlug: string, productSlug: string): Promise<ProductDetailResponse> => {
        const { data } = await apiClient.get<ProductDetailResponse>(`/${storeSlug}/products/${productSlug}`)
        return data
    }
};