import log from '../utils/log';
import isClient from '../utils/isClient';
import { capitalize } from '../utils/text';
import definitions from '../models/';

const isServer = !isClient();

const logout = () => ({ type: 'LOGOUT' });

const login = createActionCreator({
  intention:  'login',
  method:     'post',
  path:      '/login',
  auth:       false,
});

const readAll = createActionCreator({
  intention: 'readAll',
  method: 'get',
  path: '/api/readAll',
  auth: false,
});

export default Object.assign({}, createDefaultCRUDActions(), {
  login, logout, readAll,
});

// (string)            intention   The queryDatabase handle, also used to create actionTypes
// (string)            method      HTTP method
// (string)            pathx       API path. If (method && path) an corresponding API route gets created
// (string or false)   auth        Authentication strategy
function createActionCreator(shape) {
  
  const { intention, method, path } = shape;
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
        const pathWithQuery = isPost || !params ? path : appendQuery(path, params);
        
        log(`+++ --> ${method} ${path}`, params);
        
        xhr.onerror = err => reject({ 
          intention,
          status: 0, 
          response: 'An error occured, check your internet connection: ' + err.message, 
        });
        
        xhr.open(method, pathWithQuery);
        
        xhr.onload = () => {
          const { status, response } = xhr;
          let data;
          try {
            data = JSON.parse(response);
            status === 200 ? resolve(data) : reject({ status, intention, response });
          }
          catch(e) {
            reject({ status, intention, response });
          }
        };
        
        if (isPost) {
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhr.send(JSON.stringify(params));
        }
        else xhr.send();
      }
    });
    
    promise.then(
      result => !isServer ? log(`+++ <-- ${intention}`, result) : 0,
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

function appendQuery(path, params) {
  let p = path + '?';
  let addand = false;
  
  for (let key in params) {
    const val = params[key];
    addand ? p += '&' : addand = true;
    if (val) p += `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
  }
  
  return p;
}

function createDefaultCRUDActions() {
  const ac = {};
  
  for (let model in definitions) {
    const { name, authCode, adminCode } = definitions[model];
    
    const Name = capitalize(name);
    const path = '/api/' + name;
    const _create = 'create' + Name;
    const _read   = 'read'   + Name;
    const _update = 'update' + Name;
    const _delete = 'delete' + Name;
    
    ac[_create] = createActionCreator({
      path,
      method: 'post',
      intention: _create,
      auth: authCode.charAt[0] === '1',
      admin: adminCode.charAt[0] === '1',
    });
    ac[_read] = createActionCreator({
      path,
      method: 'get',
      intention: _read,
      auth: authCode.charAt[1] === '1',
      admin: adminCode.charAt[1] === '1',
    });
    ac[_update] = createActionCreator({
      path,
      method: 'put',
      intention: _update,
      auth: authCode.charAt[2] === '1',
      admin: adminCode.charAt[2] === '1',
    });
    ac[_delete] = createActionCreator({
      path,
      method: 'delete',
      intention: _delete,
      auth: authCode.charAt[3] === '1',
      admin: adminCode.charAt[3] === '1',
    });
    
  }
  
  return ac;
} 
