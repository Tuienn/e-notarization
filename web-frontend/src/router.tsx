import { createRouter, lazyRouteComponent } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import SuspendComponent from './components/common/layout/SuspendComponent'

export const router = createRouter({
    routeTree,
    defaultPendingComponent: SuspendComponent,
    defaultNotFoundComponent: lazyRouteComponent(() => import('./components/common/layout/NotFoundPage'))
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
