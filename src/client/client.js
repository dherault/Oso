import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import routes from '../routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from '../redux/configureStore';
import { Provider } from 'react-redux';

const store = configureStore(window.STATE_FROM_SERVER || {});

const app = render(
  <Provider store={store}>
    <Router routes={routes} history={createBrowserHistory()} />
  </Provider>, 
  document.getElementById('mountNode'),
  () => console.log('App rendered.')
);
