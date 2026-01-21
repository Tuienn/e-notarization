import { Route as rootRoute } from './routes/__root'
import { Route as ContactRoute } from './routes/contact'
import { Route as AboutRoute } from './routes/about'
import { Route as IndexRoute } from './routes/index'

const ContactRouteRoute = ContactRoute
const AboutRouteRoute = AboutRoute
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
        '/about': {
            id: '/about'
            path: '/about'
            fullPath: '/about'
            preLoaderRoute: typeof AboutRouteRoute
            parentRoute: typeof rootRoute
        }
        '/contact': {
            id: '/contact'
            path: '/contact'
            fullPath: '/contact'
            preLoaderRoute: typeof ContactRouteRoute
            parentRoute: typeof rootRoute
        }
    }
}

Object.assign(IndexRouteRoute.options, {
    id: '/',
    path: '/',
    getParentRoute: () => rootRoute
})

Object.assign(AboutRouteRoute.options, {
    id: '/about',
    path: '/about',
    getParentRoute: () => rootRoute
})

Object.assign(ContactRouteRoute.options, {
    id: '/contact',
    path: '/contact',
    getParentRoute: () => rootRoute
})

export const routeTree = rootRoute.addChildren({
    IndexRouteRoute,
    AboutRouteRoute,
    ContactRouteRoute
})
