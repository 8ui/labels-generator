import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist'
import rootReducer from './reducer';

const ISDEV = !process.env.NODE_ENV
  || process.env.NODE_ENV === 'development'

const middlewares = [];

middlewares.push(applyMiddleware(thunk))

if (ISDEV) {
  const logger = createLogger({
    collapsed: true
  });
  middlewares.push(applyMiddleware(logger))
}

export default function configureStore() {
  const store = compose(
     ...middlewares,
   )(createStore)(rootReducer);

const persistor = persistStore(store)

 return {
   store, persistor
 }
}
