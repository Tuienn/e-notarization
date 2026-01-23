import { Route as rootRoute } from './__root'
import { Route as LayoutRoute } from './_layout'
import { Route as LoginRoute } from './login'
import { Route as LayoutIndexRoute } from './_layout/index'
import { Route as LayoutPersonalRoute } from './_layout/personal'

declare module '@tanstack/react-router' {
    interface FileRoutesByPath {
        '/_layout': {
            id: '/_layout'
            path: ''
            fullPath: ''
            preLoaderRoute: typeof LayoutRoute
            parentRoute: typeof rootRoute
        }
        '/_layout/': {
            id: '/_layout/'
            path: '/'
            fullPath: '/'
            preLoaderRoute: typeof LayoutIndexRoute
            parentRoute: typeof LayoutRoute
        }
        '/_layout/personal': {
            id: '/_layout/personal'
            path: '/personal'
            fullPath: '/personal'
            preLoaderRoute: typeof LayoutPersonalRoute
            parentRoute: typeof LayoutRoute
        }
        '/login': {
            id: '/login'
            path: '/login'
            fullPath: '/login'
            preLoaderRoute: typeof LoginRoute
            parentRoute: typeof rootRoute
        }
    }
}

Object.assign(LayoutRoute.options, {
    id: '/_layout',
    getParentRoute: () => rootRoute
})

Object.assign(LoginRoute.options, {
    id: '/login',
    path: '/login',
    getParentRoute: () => rootRoute
})

Object.assign(LayoutIndexRoute.options, {
    id: '/_layout/',
    path: '/',
    getParentRoute: () => LayoutRoute
})

Object.assign(LayoutPersonalRoute.options, {
    id: '/_layout/personal',
    path: '/personal',
    getParentRoute: () => LayoutRoute
})

export const routeTree = rootRoute.addChildren({
    LayoutRoute: LayoutRoute.addChildren({
        LayoutIndexRoute,
        LayoutPersonalRoute
    }),
    LoginRoute
})
