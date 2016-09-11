import React from 'react'
import { Route, IndexRoute } from 'react-router'

import redirect from './setup/redirect'

import App from './components/App/App'

import Setup from './components/Setup/Setup'
import Token from './components/Setup/Token/Token'
import SinceDate from './components/Setup/SinceDate/SinceDate'

const basePath = (process.env.NODE_ENV === 'production') ? '/toggl-balance' : '/'

export default (
  <Route path={basePath} component={redirect(App)}>
    <Route path="setup" component={Setup}>
      <IndexRoute component={Token} />
      <Route path="token" component={Token} />
      <Route path="since" component={SinceDate} />
    </Route>
  </Route>
)
