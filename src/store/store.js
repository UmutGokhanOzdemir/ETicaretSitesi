import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/rootReducer'

const middlewares = [thunk]

if (import.meta.env.DEV) {
  middlewares.push(createLogger({ collapsed: true }))
}

const store = createStore(rootReducer, applyMiddleware(...middlewares))

if (import.meta.env.DEV) {
  console.log('Redux store ready', store.getState())
}

export default store
