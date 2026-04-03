import { useQuery } from "@tanstack/react-query";
import { storeService } from "../service/store/api.store";
import { useParams } from "react-router-dom";


export const storeKey = {
    all: (storeSlug: string) => ['store', storeSlug] as const,
    detail: (storeSlug: string) => ['store', storeSlug] as const,
};
export function useStoreMangment() {
    const { storeSlug } = useParams<{ storeSlug: string }>();
    if (!storeSlug) throw new Error("storeSlug is required");
    return useQuery({
        queryKey: storeKey.detail(storeSlug),
        queryFn: () => storeService.getStore(storeSlug),
        select: (data) => data,
        staleTime: 1000 * 60 * 2,
        enabled: !!storeSlug,
    });
}