
export interface CreateAddressDto {
    neighborhood?: string;
    city: string;
    name?: string;
    phone: string;
}

export interface CreateOrderItemDto {
    productId: string;
    variantId?: string;
    quantity: number;
}

export interface CreateOrderDto {
    address: CreateAddressDto;
    paymentMethod: 'cash';
    customerNote?: string;
    items: CreateOrderItemDto[]
}

export interface OrderItemDto {
    id: string;
    productId: string;
    productName: string;
    productSku?: string;
    variantId?: string;
    variantName?: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface OrderDto {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    subtotal: number;
    tax: number;
    shippingCost: number;
    discountAmount: number;
    total: number;
    customerNote?: string;
    items: OrderItemDto[];
    itemsCount: number;
    shippingAddress: CreateAddressDto;
    createdAt: string;
    updatedAt: string;
}

export interface ResponseDto<T = any> {
    success: boolean;
    message: string;
    data?: T;
    whatssappRedirectUrl?: string;
}