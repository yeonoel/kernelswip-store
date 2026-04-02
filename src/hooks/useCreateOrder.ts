import { useMutation } from '@tanstack/react-query'
import { useOrderStore } from './useOrdersStore'
import type { CreateOrderDto, OrderDto, ResponseDto } from '../types/order.type'
import { ordersService } from '../service/Orders/api.service'
import { normalizeIvorianPhone } from '../lib/phone'

export function useCreateOrder(storeSlug: string) {
    const { item, phone, commune, quartier, customerNote, goTo } = useOrderStore()

    const mutation = useMutation<ResponseDto<OrderDto>, Error, CreateOrderDto>({
        mutationFn: (dto: CreateOrderDto) => ordersService.create(storeSlug, dto),
        onSuccess: () => goTo('success'),
    })

    function submitOrder() {
        if (!item || !commune || !quartier) return

        const normalizedPhone = normalizeIvorianPhone(phone)
        if (!normalizedPhone) return

        // Trouve le variantId correspondant à la couleur + taille sélectionnées
        const matchedVariant = item.product.variants.find(v =>
            (!item.color || v.color === item.color) &&
            (!item.size || v.size === item.size) &&
            v.isActive && !v.isDeleted
        )

        const dto: CreateOrderDto = {
            address: {
                phone: normalizedPhone,
                city: commune,
                neighborhood: quartier,
            },
            paymentMethod: 'cash',
            customerNote: customerNote || undefined,

            // Items avec productId + variantId + quantity
            items: [
                {
                    productId: item.product.id,
                    variantId: matchedVariant?.id ?? undefined,
                    quantity: item.quantity,
                }
            ],
        }

        mutation.mutate(dto)
    }

    return {
        submitOrder,
        data: mutation.data?.data,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    }
}