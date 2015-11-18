import React from 'react';
import ReactDOM from 'react-dom';
import App from '../shared/components/app';

const app = ReactDOM.render(
  <App />, 
  document.getElementById('mountNode'),
  () => console.log('App rendered.')
);

console.log('Hello client!!!');
