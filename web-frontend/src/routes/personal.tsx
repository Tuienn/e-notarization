import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/personal')({
    component: lazyRouteComponent(() => import('../components/pages/personal'))
})
