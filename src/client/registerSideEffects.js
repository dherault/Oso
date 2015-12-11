import { pushState } from 'redux-router';

import log from '../utils/log';
import definitions from '../models/';

export default function registerSideEffects(store) {
  
  const logR = type => log('.E. redirecting after', type);
  
  const { subscribe, getState, dispatch } = store; 
  const navigate = path => {
    log('.E. redirecting to', path);
    dispatch(pushState(null, path));
  };
  
  subscribe(() => {
    const { type, payload } = getState().lastAction;
    
    // Temp ?
    if (/^SUCCESS_CREATE_/.test(type)) {
      const definition = definitions[type.slice(15).toLowerCase()];
      
      if (!definition) return;
      const whatIsNew = definition.pluralName;
      navigate('/data/explore/' + whatIsNew + '/' + Object.keys(payload[whatIsNew])[0]);
    }
    
  });
  
}
