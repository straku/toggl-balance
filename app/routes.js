import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App/App'

import Setup from './components/Setup/Setup'
import Token from './components/Setup/Token/Token'
import SinceDate from './components/Setup/SinceDate/SinceDate'

export default (
  <Route path="/" component={App}>
    <Route path="setup" component={Setup}>
      <IndexRoute component={Token} />
      <Route path="token" component={Token} />
      <Route path="since" component={SinceDate} />
    </Route>
  </Route>
)
