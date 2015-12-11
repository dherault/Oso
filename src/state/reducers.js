import { routerStateReducer } from 'redux-router';

import log from '../utils/log';
import definitions from '../models/';

const crud = reduceDefaultCRUDTypes;
const initialCameraState = {
  position: {
    x: 0,
    y: 0,
    z: 300,
  },
  fov: 45,
  near: 0.01,
  far: 600 * 15,
};

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
  
  camera: (state=initialCameraState, { type, payload, params }) => {
    switch (type) {
    
    case 'UPDATE_CAMERA_POSITION':
      const newState = Object.assign({}, state);
      newState.position = params;
      return newState;
      
    default:
      return state;
    }
  },
  
  object3Ds: (state={}, { type, payload, params }) => {
    let newState;
    
    switch (type) {
      case 'SUCCESS_CREATE_OBJECT3D':
        return Object.assign({}, state, { [payload.id]: payload });
        
      case 'SHOW_OBJECT3D':
        newState = Object.assign({}, state);
        if (newState[params.id]) newState[params.id].visible = true; // This is an oldState mutation :'(
        return newState;
        
      case 'HIDE_OBJECT3D':
        newState = Object.assign({}, state);
        if (newState[params.id]) newState[params.id].visible = false;
        return newState;
        
      case 'TOOGLE_OBJECT3D':
        newState = Object.assign({}, state);
        if (newState[params.id]) newState[params.id].visible = !newState[params.id].visible;
        return newState;
      
      default:
        return state;
    }
  },
  
  router: routerStateReducer,
  lastAction: (state={}, action) => action,
  // records: (state=[], action) => [...state, Object.assign({date: new Date().getTime()}, action)],
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

// function reduceDefaultArrayTypes(model, reduce) {
  
//   return (state=[], {type, payload, params}) => {
//     const newState = reduce(state, {type, payload, params}).slice();
    
//     const n = definitions[model].name.toUpperCase();
    
//     const bingo = ['ADD', 'UPDATE', 'REMOVE', 'REMOVE_BY_INDEX'].map(x => `${x}_${n}`);
    
//     switch (bingo.indexOf(type)) {
      
//       case 0:
//         newState.push(params);
//         break;
        
//       case 1:
//         newState[params] = Object.assign({}, newState[params], payload);
//         break;
        
//       case 2:
//         const i = newState.indexOf(params);
//         if (i !== -1) newState.splice(i, 1);
//         break;
        
//       case 3:
//         newState.splice(params, 1);
      
//       default:
//         break;
//     }
    
//     return newState;
//   };
// }
