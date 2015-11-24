import { routerStateReducer } from 'redux-router';

import log from '../utils/log';
import definitions from '../models/';

const crud = reduceDefaultCRUDTypes;

export default {
  
  users: crud('user', (state={}, {type, payload, params}) => {
    
    log('.R. ' + type); // keep this line in the first reducer
    
    switch (type) {
      
    default:
      return state;
    }
  }),
  
  cities: crud('city', (state={}, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return state;
    }
  }),
  
  agents: crud('agent', (state={}, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return state;
    }
  }),
  
  jobs: crud('job', (state={}, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return state;
    }
  }),
  
  skills: crud('skill', (state={}, {type, payload, params}) => {
    
    switch (type) {
    
    default:
      return state;
    }
  }),
  
  items: crud('item', (state={}, {type, payload, params}) => {
    
    switch (type) {
    
    default:
      return state;
    }
  }),
  
  // 3dObjects: (state=[], {type, payload, params}) => {
    
  //   switch (type) {
  //     case 'CREATE_3DOBJECT':
  //       return [...state, payload];
        
  //     case 'UPDATE_3DOBJECT':
  //       if (params.index) {
  //         return state.slice(0, index - 1).concat([Object.assign({}, state, )])
  //       }
  //       return [...state, payload];
      
  //     default:
  //       return state;
  //   }
  // }
  
  router: routerStateReducer,
  records: (state=[], action) => [...state, Object.assign({date: new Date().getTime()}, action)]
};


function reduceDefaultCRUDTypes(model, reduce) {
  
  return (state={}, {type, payload, params}) => {
    const newState = reduce(state, {type, payload, params});
    
    const ns = definitions[model].name.toUpperCase();
    const np = definitions[model].pluralName;
    
    const bingo = ['READ', 'CREATE', 'UPDATE', 'DELETE']
      .map(x => `SUCCESS_${x}_${ns}`)
      .concat(['SUCCESS_READ_ALL']);
    
    switch (bingo.indexOf(type)) {
      
      case -1:
        return state;
        
      case 0:
      case 1:
        return Object.assign({}, state, payload[np], newState);
        
      case 2:
        const { id } = params;
        return Object.assign({}, state, { [id]: Object.assign({}, state[id], params) }, newState);
      
      case 4:
        return params.table !== np ? newState : Object.assign({}, payload[np]);
      
      default:
        return newState;
    }
  };
}
