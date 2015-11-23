import { routerStateReducer } from 'redux-router';

import log from '../utils/log';
import definitions from '../models/';

export default {
  
  users: (state={}, {type, payload, params}) => {
    
    log('.R. ' + type); // keep this line in the first reducer
    
    switch (type) {
      
    default:
      return reduceDefaultCRUDTypes(state, {type, payload, params}, 'user');
    }
  },
  
  cities: (state={}, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return reduceDefaultCRUDTypes(state, {type, payload, params}, 'city');
    }
  },
  
  agents: (state={}, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return reduceDefaultCRUDTypes(state, {type, payload, params}, 'agent');
    }
  },
  
  jobs: (state={}, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return reduceDefaultCRUDTypes(state, {type, payload, params}, 'job');
    }
  },
  
  skills: (state={}, {type, payload, params}) => {
    
    switch (type) {
    
    default:
      return reduceDefaultCRUDTypes(state, {type, payload, params}, 'skill');
    }
  },
  
  items: (state={}, {type, payload, params}) => {
    
    switch (type) {
    
    default:
      return reduceDefaultCRUDTypes(state, {type, payload, params}, 'item');
    }
  },
  
  router: routerStateReducer,
  records: (state=[], action) => [...state, Object.assign({date: new Date().getTime()}, action)]
};


function reduceDefaultCRUDTypes(state, { type, payload, params }, model) {
  
  const ns = definitions[model].name.toUpperCase();
  const np = definitions[model].pluralName;
  
  const bingo = ['READ', 'CREATE', 'UPDATE', 'DELETE'].map(x => `SUCCESS_${x}_${ns}`);
  
  if (type === 'SUCCESS_READ_ALL' && params.table === np) return Object.assign({}, payload[np]);
  
  switch (bingo.indexOf(type)) {
    
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
