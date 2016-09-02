import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from '../reducers'

const logger = createLogger({
  duration: true,
  collapsed: true,
})

const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
)

export default store
