import React from 'react'
import NotFoundPage from '../pages/error/NotFoundPage'
import GuestLayout from '../components/layout/GuestLayout'
import MainLayout from '../components/layout/MainLayout'
import LazyLoadWrapper from '../components/application/LazyLoadWrapper'

/**
 * Auto import tất cả pages dưới ../pages (dùng cho lazy load)
 */
const pageModules = import.meta.glob('../pages/**/*.jsx')

/**
 * Get List Route Modules (public / private)
 */
const publicRoutes = import.meta.glob('./public/**/*.jsx', { eager: true })
const privateRoutes = import.meta.glob('./private/**/*.jsx', { eager: true })

/**
 * Parse route module
 */
const parseModules = (modules) => {
  const routes = []
  const paths = []

  Object.values(modules).forEach((mod) => {
    if (mod.default) {
      const parsed = mod.default.map((route) => {
        const matchedPath = Object.keys(pageModules).find((key) => {
          const componentName = route.component.toLowerCase()

          return key.toLowerCase().endsWith(`/pages/${componentName}.jsx`) ||
                key.toLowerCase().endsWith(`/pages/${componentName}/index.jsx`)
        })

        const Component = React.lazy(pageModules[matchedPath])

        return {
          ...route,
          component: () => <LazyLoadWrapper component={Component} />,
        }
      }).filter(Boolean)

      routes.push(...parsed)
      paths.push(...parsed.map((o) => o.path))
    }
  })

  return {
    routes,
    paths,
  }
}

const parsedPublic = parseModules(publicRoutes)
const parsedPrivate = parseModules(privateRoutes)

const routes = [
  {
    path: parsedPublic.paths,
    exact: true,
    requiredAuth: false,
    restricted: true,
    component: GuestLayout,
    routes: parsedPublic.routes,
  },
  {
    path: parsedPrivate.paths,
    exact: true,
    requiredAuth: true,
    restricted: false,
    component: MainLayout,
    routes: parsedPrivate.routes,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
]

export default routes
