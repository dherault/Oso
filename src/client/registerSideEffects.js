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
    const { records } = getState();
    const lastAction = records[records.length - 1];
    const { type, payload } = lastAction;
    
    // Temp ?
    if (/^SUCCESS_CREATE_/.test(type)) {
      const whatIsNew = definitions[type.slice(15).toLowerCase()].pluralName;
      navigate('/data/explore/' + whatIsNew + '/' + Object.keys(payload[whatIsNew])[0]);
    }
    
  });
  
}
