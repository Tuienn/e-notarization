import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import CheckoutBillPage from '../components/pages/checkout-bill'

const checkoutBillSearchSchema = z.object({
    game: z.string().default('Lotto 5/35'),
    tickets: z.coerce.number().min(0).default(0),
    total: z.coerce.number().min(0).default(0)
})

export const Route = createFileRoute('/checkout-bill')({
    validateSearch: checkoutBillSearchSchema,
    component: CheckoutBillPage
})
