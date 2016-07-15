import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './Root'
import store from './store'

// Needed to trick react-router into thinking that routes didn't change in order to get rid of annoying error,
// `referentially-equal-root-route` is exporting empty object but since it is a singleton it will always hold the
// same reference, next we are creating actual routes by merging objects with `Object.assign` so `routes` is also
// holding the same reference despite the fact that imported `routeDefinitions` from `route` module can change.
// Source: https://github.com/gaearon/react-hot-boilerplate/pull/61#issuecomment-218982382
// TODO: Simplify when https://github.com/reactjs/react-router/issues/2182 will land
import referentialyEqualRootRoute from './referentially-equal-root-route'
import routeDefinitions from '../routes'
const routes = Object.assign(referentialyEqualRootRoute, routeDefinitions)

const rootElement = document.getElementById('root')

render(
  <AppContainer>
    <Root store={store} routes={routes} />
  </AppContainer>,
  rootElement
)

if (module.hot) {
  module.hot.accept(['../routes'], () => {
    render(
      <AppContainer>
        <Root store={store} routes={routes} />
      </AppContainer>,
      rootElement
    )
  })
}
