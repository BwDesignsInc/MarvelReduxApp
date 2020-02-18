import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from '../rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middleware),
))

export default store;