import log from '../utils/log';
import isClient from '../utils/isClient';
const isServer = !isClient();

// Si une transition peut avoir lieu dans les sides effects alors preferer cette methode
// Cet AC est provisoire et devra être remplacé par <Link/> partout (SEO friendly)
export const transitionTo = (pathname, query, state) => ({ type: 'TRANSITION_TO', payload: {pathname, query, state} });

export const logout = () => ({ type: 'LOGOUT' });

export const readUniverse = createActionCreator({
  intention:  'readUniverse',
  method:     'get',
  pathx:      '/api/universe/{p}',
  auth:       false,
});

export const createUser = createActionCreator({
  intention:  'createUser',
  method:     'post',
  pathx:      '/api/user/',
  auth:       false,
});

export const login = createActionCreator({
  intention:  'login',
  method:     'post',
  pathx:      '/login',
  auth:       false,
});

const actionCreators = {
  transitionTo, login, logout,
  createUser,  
  readUniverse,
};

export default actionCreators;

// (string)            intention   The queryDb hook, also used to create actionTypes
// (string)            method      HTTP method
// (string)            pathx       API path. If (method && path) an corresponding API route gets created
// (string or false)   auth        Authentication strategy
function createActionCreator(shape) {
  
  const { intention, method, pathx } = shape;
  const types = ['REQUEST', 'SUCCESS', 'FAILURE'].map(t => `${t}_${intention.replace(/[A-Z]/g, '_$&')}`.toUpperCase());
  
  const actionCreator = params => {
    log('.A.', intention, params ? JSON.stringify(params) : '');
    const promise = new Promise((resolve, reject) => {
      
      // Server : direct db middleware call
      if (isServer) require('../server/database/databaseMiddleware')(intention, params).then(resolve, reject);
      
      // Client : API call through XMLHttpRequest
      else {
        const xhr = new XMLHttpRequest();
        const isPost = method === 'post' || method === 'put';
        const path = isPost || !params ? pathx : 
          pathx.replace(/{([A-Za-z]*)}/g, (match, p1) => params[p1] || params);
          
        log(`+++ --> ${method} ${path}`, params);
        
        xhr.onerror = err => reject({ 
          intention,
          status: 0, 
          response: 'An error occured, check your internet connection: ' + err.message, 
        });
        
        xhr.open(method, path);
        
        xhr.onload = () => {
          const {status, response} = xhr;
          let data;
          try {
            data = JSON.parse(response);
            status === 200 ? resolve(data) : reject({ status, intention, response });
          }
          catch(e) {
            reject({ status, intention, response });
          }
        };
        
        if (isPost) { // Stringifies objects before a POST request
          let form = new FormData();
          for (let key in params) {
            if (params.hasOwnProperty(key)) {
              const value = params[key];
              form.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
            }
          }
          xhr.send(form);
        }
        else xhr.send();
      }
    });
    
    promise.then(
      result => {
        if (!isServer) log(`+++ <-- ${intention}`, result);
      }, 
      ({ status, response, intention }) => {
        log('!!! API Action error', intention);
        log('!!! params', params);
        log('!!! response', status, response);
      });
    
    return { types, params, promise };
  };
  
  // getters
  actionCreator.getTypes = () => types;
  actionCreator.getShape = () => shape;
  
  return actionCreator;
}
