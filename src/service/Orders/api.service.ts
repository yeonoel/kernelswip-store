import type { CreateOrderDto, OrderDto, ResponseDto } from "../../types/order.type";
import apiClient from "../../api/client";

export const ordersService = {
    create: async (storeSlug: string, dto: CreateOrderDto): Promise<ResponseDto<OrderDto>> => {
        const { data } = await apiClient.post<ResponseDto<OrderDto>>(`/orders/create/${storeSlug}`, dto)
        return data
    }
};