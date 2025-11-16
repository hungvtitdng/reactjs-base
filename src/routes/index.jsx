import NotFoundPage from '../pages/error/NotFoundPage'
import GuestLayout from '../components/layout/GuestLayout'
import MainLayout from '../components/layout/MainLayout'

/**
 * Get List Route Modules.
 *
 * @returns {[]}
 */
const publicRoutes = import.meta.glob('./public/**/*.jsx', { eager: true })
const privateRoutes = import.meta.glob('./private/**/*.jsx', { eager: true })

const parseModules = (modules) => {
  const routes = []
  const paths = []

  Object.values(modules).forEach((mod) => {
    if (mod.default) {
      routes.push(...mod.default)
      paths.push(...mod.default.map((o) => o.path))
    }
  })

  return {
    routes,
    paths,
  }
}

const routes = [
  {
    path: parseModules(publicRoutes).paths,
    exact: true,
    requiredAuth: false,
    restricted: true,
    component: GuestLayout,
    routes: parseModules(publicRoutes).routes,
  },
  {
    path: parseModules(privateRoutes).paths,
    exact: true,
    requiredAuth: true,
    restricted: false,
    component: MainLayout,
    routes: parseModules(privateRoutes).routes,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
]

export default routes
