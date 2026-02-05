import { createFileRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../stores/auth/auth.store'

export const Route = createFileRoute('/register')({
    beforeLoad: () => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated
        if (isAuthenticated) {
            throw redirect({ to: '/' })
        }
    },
    component: lazyRouteComponent(() => import('../components/pages/register'))
})
