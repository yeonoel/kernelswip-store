import apiClient from "../../api/client";
import type { StoreData } from "../../types/store.type";

export const storeService = {
    getStore: async (storeSlug: string): Promise<StoreData> => {
        const { data } = await apiClient.get<StoreData>(`/stores/store/${storeSlug}`)
        return data;
    }
};