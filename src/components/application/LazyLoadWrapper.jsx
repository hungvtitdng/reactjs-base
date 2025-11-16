import React, { Suspense } from 'react'
import LoadingPage from '../../pages/loading'

const LazyLoadWrapper = ({ component: Component, hasLoadingPage = true }) => (
  <Suspense fallback={hasLoadingPage ? <LoadingPage /> : null}>
    <Component />
  </Suspense>
)

export default LazyLoadWrapper
