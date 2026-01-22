import { Route as rootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'

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
    }
}

Object.assign(IndexRouteRoute.options, {
    id: '/',
    path: '/',
    getParentRoute: () => rootRoute
})

export const routeTree = rootRoute.addChildren({
    IndexRouteRoute
})
