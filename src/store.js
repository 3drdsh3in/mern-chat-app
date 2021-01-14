import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './rootReducer';
import createSocketMiddleware from './utils/socket-middleware';

const middleware = [thunk, createSocketMiddleware()];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Configuration If NPM Package Isn't needed.

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const extendedMiddleware = process.env.NODE_ENV === 'production' ? applyMiddleware(...middleware) : composeWithDevTools(applyMiddleware(...middleware))

const store = createStore(
  persistedReducer,
  extendedMiddleware
)
const persistor = persistStore(store);

export { store, persistor };