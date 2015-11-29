import { routerStateReducer } from 'redux-router';

import log from '../utils/log';
import definitions from '../models/';

const crud = reduceDefaultCRUDTypes;
const array = reduceDefaultArrayTypes;

export default {
  
  users: crud('user', (state, {type, payload, params}) => {
    
    log('.R. ' + type); // keep this line in the first reducer
    
    switch (type) {
      
    default:
      return state;
    }
  }),
  
  cities: crud('city', (state, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return state;
    }
  }),
  
  agents: crud('agent', (state, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return state;
    }
  }),
  
  jobs: crud('job', (state, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return state;
    }
  }),
  
  skills: crud('skill', (state, {type, payload, params}) => {
    
    switch (type) {
    
    default:
      return state;
    }
  }),
  
  items: crud('item', (state, {type, payload, params}) => {
    
    switch (type) {
    
    default:
      return state;
    }
  }),
  
  // loadedSets: array('loadedSet', state => state),
  // xObjects: array('3dObject', state => state),
  // lights: array('light', state => state),
  object3Ds: (state={}, { type, payload, params }) => {
    
    switch (type) {
      case 'SUCCESS_CREATE_OBJECT3D':
        return Object.assign({}, state, { [payload.id]: payload });
      
      default:
        return state;
    }
  },
  
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
        return newState;
        
      case 0:
      case 1:
        return Object.assign({}, newState, payload[np]);
        
      case 2:
        const { id } = params;
        return Object.assign({}, newState, { [id]: Object.assign({}, newState[id], params) });
      
      case 4:
        return params.table !== np ? newState : Object.assign({}, payload[np]);
      
      default:
        return newState;
    }
  };
}

function reduceDefaultArrayTypes(model, reduce) {
  
  return (state=[], {type, payload, params}) => {
    const newState = reduce(state, {type, payload, params}).slice();
    
    const n = definitions[model].name.toUpperCase();
    
    const bingo = ['ADD', 'UPDATE', 'REMOVE', 'REMOVE_BY_INDEX'].map(x => `${x}_${n}`);
    
    switch (bingo.indexOf(type)) {
      
      case 0:
        newState.push(params);
        break;
        
      case 1:
        newState[params] = Object.assign({}, newState[params], payload);
        break;
        
      case 2:
        const i = newState.indexOf(params);
        if (i !== -1) newState.splice(i, 1);
        break;
        
      case 3:
        newState.splice(params, 1);
      
      default:
        break;
    }
    
    return newState;
  };
}
