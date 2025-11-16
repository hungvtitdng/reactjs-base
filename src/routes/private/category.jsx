import React from 'react'
import LazyLoadWrapper from '../../components/application/LazyLoadWrapper'

const BranchPage = React.lazy(() => import('../../pages/category'))

const routes = [
  {
    path: '/settings/categories',
    exact: true,
    requiredAuth: true,
    component: () => <LazyLoadWrapper component={BranchPage} />,
  },
]

export default routes
