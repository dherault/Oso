import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import routes from '../shared/routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const app = render(
  <Router routes={routes} history={createBrowserHistory()} />, 
  document.getElementById('mountNode'),
  () => console.log('App rendered.')
);
