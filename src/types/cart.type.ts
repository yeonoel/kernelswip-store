
export interface CartItem {
    productId: string;
    variantId: string;
    productName: string;
    productSlug: string;
    productImage: string;
    variantName: string;
    color: string | null;
    size: string | null;
    price: number;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
    itemsCount: number;
}
