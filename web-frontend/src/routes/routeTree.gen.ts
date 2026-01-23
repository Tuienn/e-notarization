import { Route as rootRoute } from './__root'
import { Route as IndexRoute } from './index'
import { Route as PersonalRoute } from './personal'

const IndexRouteRoute = IndexRoute

declare module '@tanstack/react-router' {
    interface FileRoutesByPath {
        '/': {
            id: '/'
            path: '/'
            fullPath: '/'
            preLoaderRoute: typeof IndexRouteRoute
            parentRoute: typeof rootRoute
        }

        '/personal': {
            id: '/personal'
            path: '/personal'
            fullPath: '/personal'
            preLoaderRoute: typeof PersonalRoute
            parentRoute: typeof rootRoute
        }
    }
}

Object.assign(IndexRouteRoute.options, {
    id: '/',
    path: '/',
    getParentRoute: () => rootRoute
})

Object.assign(PersonalRoute.options, {
    id: '/personal',
    path: '/personal',
    getParentRoute: () => rootRoute
})

export const routeTree = rootRoute.addChildren({
    IndexRouteRoute,
    PersonalRoute
})
