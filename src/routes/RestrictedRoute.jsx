import React, { memo } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { hasAuth } from './permission'

const RestrictedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      hasAuth() ? (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location },
        }}
        />
      ) : <Route {...rest} render={() => <Component />} />
    )}
  />
)

export default memo(RestrictedRoute)
