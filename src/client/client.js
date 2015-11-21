import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import routes from '../routes';
import configureStore from '../state/configureStore';
import registerShortcuts from './registerShortcuts';
import registerSideEffects from './registerSideEffects';


const store = configureStore(window.STATE_FROM_SERVER || {});
// const history = createBrowserHistory();

const app = render(
  <Provider store={store}>
    <ReduxRouter routes={routes} />
  </Provider>, 
  document.getElementById('mountNode'),
  () => console.log('App rendered.')
);

registerShortcuts(store.getState);
registerSideEffects(store);

require('./styles/app.style.js');
