import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import Oso from './renderer/Oso';
import routes from '../routes';
import configureStore from '../state/configureStore';
import registerShortcuts from './registerShortcuts';
import registerSideEffects from './registerSideEffects';
import Stats from './vendor/stats'; 

const store = configureStore(window.STATE_FROM_SERVER || {});
const oso = new Oso(store);

export const stop = () => oso.stop();
export const start = () => {
  document.getElementById('oso_mount_node').appendChild(oso.renderer.domElement);
  oso.start();
};

const app = render(
  <Provider store={store}>
    <ReduxRouter routes={routes} />
  </Provider>, 
  document.getElementById('react_mount_node'),
  () => console.log('App rendered.')
);

registerSideEffects(store);
registerShortcuts(store.getState);

require('./styles/app.css');

const stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );
const update = () => {
  stats.begin();
  // monitored code goes here
  stats.end();
  window.requestAnimationFrame( update );
};

window.requestAnimationFrame( update );
