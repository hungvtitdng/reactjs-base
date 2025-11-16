import React from 'react'
import LazyLoadWrapper from '../../components/application/LazyLoadWrapper'

const DashboardPage = React.lazy(() => import('../../pages/dashboard'))

const routes = [
  {
    path: '/',
    exact: true,
    requiredAuth: true,
    component: () => <LazyLoadWrapper component={DashboardPage} />,
  },
]

export default routes
