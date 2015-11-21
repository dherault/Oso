// import docCookies from '../vendor/cookie';
import log from '../utils/log';
import definitions from '../models/';
import { pushState } from 'redux-router';
// import { isAPIUnauthorized } from '../../shared/actionCreators';

export default function registerSideEffects(store) {
  
  const logR = type => log('.E. redirecting after', type);
  // const setRedirection = path => store.dispatch({
  //   type: 'SET_REDIRECTION',
  //   payload: path,
  // });
  
  // function redirectAfterLogin(type, {query}, {redirection}) {
  //   logR(type);
  //   const r = query ? query.r : undefined;
  //   transitionTo(r ? r : redirection ? redirection : '/Explore');
  //   setRedirection('');
  // }
  
  const { subscribe, getState, dispatch } = store; 
  
  subscribe(() => {
    const { records, router, session } = getState();
    const lastAction = records[records.length - 1];
    const { type, payload } = lastAction;
    
    // if (isAPIUnauthorized(lastAction)) {
    //   const { pathname } = router;
    //   log('.E. Unauthorized access, will redirect to', pathname);
    //   docCookies.removeItem('jwt');
    //   setRedirection(pathname);
    //   transitionTo('/login');
    //   return;
    // }
    
    // temp
    if (/SUCCESS_CREATE_/.test(type)) {
      const whatIsNew = definitions[type.slice(15).toLowerCase()].pluralName;
      dispatch(pushState(null, '/data/explore/' + whatIsNew + '/' + payload.id));
    }
    
    // switch (type) {
      
    //   case 'TRANSITION_TO':
    //     const { pathname, query, state } = payload;
    //     log('.E. transitionTo ', pathname, query, state);
    //     transitionTo(pathname, query, state);
    //     return;
        
    //   case 'LOGOUT':
    //     logR(type);
    //     docCookies.removeItem('jwt');
    //     transitionTo('/');
    //     return;
        
    //   case 'SUCCESS_LOGIN':
    //     redirectAfterLogin(type, router, session);
    //     return;
        
    //   case 'SUCCESS_CREATE_USER':
    //     redirectAfterLogin(type, router, session);
    //     return;
        
    //   case 'SUCCESS_CREATE_UNIVERSE':
    //     logR(type);
    //     transitionTo(`/~${payload.id}`);
    //     return;
        
    //   case 'SUCCESS_CREATE_TOPIC':
    //     const { id, universeId } = payload;
    //     logR(type);
    //     transitionTo(`/~${universeId}/${id}`);
    //     return;
        
    // }
  });
  
}
