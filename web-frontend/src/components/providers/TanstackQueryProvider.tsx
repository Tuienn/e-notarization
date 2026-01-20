import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

const queryClient = new QueryClient()

interface Props {
    children: ReactNode
}

export default function TanstackQueryProvider(props: Props) {
    return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}
