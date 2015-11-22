import log from '../utils/log';
import { routerStateReducer } from 'redux-router';

export default {
  
  users: (state={}, {type, payload, params}) => {
    
    log('.R. ' + type); // keep this line in the first reducer
    
    switch (type) {
      
    // case 'SUCCESS_READ_USER':
    //   return Object.assign({}, state, {[payload.id]: payload});
      
    default:
      return enhanceREST(state, {type, payload, params}, 'user', 'users');
    }
  },
  
  cities: (state={}, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return enhanceREST(state, {type, payload, params}, 'city', 'cities');
    }
  },
  
  agents: (state={}, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return enhanceREST(state, {type, payload, params}, 'agent', 'agents');
    }
  },
  
  jobs: (state={}, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return enhanceREST(state, {type, payload, params}, 'job', 'jobs');
    }
  },
  
  skills: (state={}, {type, payload, params}) => {
    
    switch (type) {
    
    default:
      return enhanceREST(state, {type, payload, params}, 'skill', 'skills');
    }
  },
  
  items: (state={}, {type, payload, params}) => {
    
    switch (type) {
    
    default:
      return enhanceREST(state, {type, payload, params}, 'item', 'items');
    }
  },
  
  router: routerStateReducer,
  records: (state=[], action) => [...state, Object.assign({date: new Date().getTime()}, action)]
};


function enhanceREST (state, { type, payload, params }, ns, np) {
  
  const bingo = ['READ', 'CREATE', 'UPDATE', 'DELETE'].map(x => `SUCCESS_${x}_${ns.toUpperCase()}`);
  
  if (type === 'SUCCESS_READ_ALL' && params.table === np) return Object.assign({}, payload[np]);
  
  const i = bingo.indexOf(type);
  
  switch (i) {
    
    case -1:
      return state;
      
    case 0:
    case 1:
      return Object.assign({}, state, payload[np]);
      
    case 2:
      const { id } = params;
      return Object.assign({}, state, { [id]: Object.assign({}, state[id], params) });
      
    default:
      return state;
  }
}
