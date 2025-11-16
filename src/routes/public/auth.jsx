import React from 'react'
import LazyLoadWrapper from '../../components/application/LazyLoadWrapper'

const Login = React.lazy(() => import('../../pages/auth/Login'))

const authRoutes = [
  {
    path: '/login',
    exact: true,
    restricted: true,
    component: () => <LazyLoadWrapper component={Login} />,
  },
]

export default authRoutes
