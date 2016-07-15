// Redux and middlewares
import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'

// combined reducers as single reducer
import reducers from '../reducers'

const logger = createLogger({
  duration: true,
  collapsed: true,
})

export default createStore(reducers, applyMiddleware(logger))
