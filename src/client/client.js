import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import Oso from './renderer/Oso';
import routes from '../routes';
import configureStore from '../state/configureStore';
import registerShortcuts from './registerShortcuts';
import registerSideEffects from './registerSideEffects';

const store = configureStore(window.STATE_FROM_SERVER || {});
const oso = new Oso(store);

const handleResize = () => oso.renderer.setSize(window.innerWidth, window.innerHeight - 30);
window.onresize = handleResize;
handleResize();


export default () => document.getElementById('oso_mount_node').appendChild(oso.renderer.domElement);

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
