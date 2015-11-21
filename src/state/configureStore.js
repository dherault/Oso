import reducers from './reducers';
import log from '../utils/log';
import isClient from '../utils/isClient';
import { reduxReactRouter } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import promiseMiddleware from './promiseMiddleware';
// import websocketMiddleware from '../shared/middleware/websocketMiddleware';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

export default function configureStore(initialState) {
  
  log('... Initializing store');
  
  const onClient = isClient();
  const createHistory = onClient ? createBrowserHistory : createMemoryHistory;
  const middlewares = onClient ? 
    applyMiddleware(promiseMiddleware/*, websocketMiddleware*/) :
    applyMiddleware(promiseMiddleware);
  
  const store = compose(middlewares, reduxReactRouter({ createHistory }))(createStore)(combineReducers(reducers), initialState);

  // Enables Webpack hot module replacement for reducers
  if (module.hot) module.hot.accept('./reducers.js', () => store.replaceReducer(require('./reducers.js')));

  return store;
}
