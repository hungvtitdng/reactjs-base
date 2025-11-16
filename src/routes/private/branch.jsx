import React from 'react'
import LazyLoadWrapper from '../../components/application/LazyLoadWrapper'

const BranchPage = React.lazy(() => import('../../pages/branch'))

const routes = [
  {
    path: '/settings/branches',
    exact: true,
    requiredAuth: true,
    component: () => <LazyLoadWrapper component={BranchPage} />,
  },
]

export default routes
