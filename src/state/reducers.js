import { routerStateReducer } from 'redux-router';
import _ from 'three';
import log from '../utils/log';
import definitions from '../models/';

const crud = reduceDefaultCRUDTypes;

const initialAvatarState = {
  position: new _.Vector3(0, 0, 0),
  movement: {
    forward: 0, backward: 0, left: 0, right: 0
  }
};
const initialCameraState = {
  position: new _.Vector3(-10, 0, 10),
  fov: 45, near: 0.01, far: 300,
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
  
  avatar: (state=initialAvatarState, { type, payload, params }) => {
    let newState;
    
    switch (type) {
      
    case 'START_AVATAR_MOVEMENT':
      newState = Object.assign({}, state);
      // We use a timestamp to resolve conflicts such as left and right, forward and backward
      // The latest movement wins
      newState.movement[params.direction] = new Date().getTime();
      return newState;
      
    case 'STOP_AVATAR_MOVEMENT':
      newState = Object.assign({}, state);
      newState.movement[params.direction] = 0;
      return newState;
      
    case 'SET_AVATAR_OBJECT_ID':
      newState = Object.assign({}, state);
      newState.objectId = params.id;
      return newState;
    
    case 'UPDATE_AVATAR_POSITION':
      newState = Object.assign({}, state, { position: state.position.clone().add(params.delta) });
      return newState;
      
    default:
      return state;
    }
  },
  
  camera: (state=initialCameraState, { type, payload, params }) => {
    let newState;
    
    switch (type) {
    
    case 'SET_CAMERA_POSITION':
      newState = Object.assign({}, state, { position: params.position });
      return newState;
      
    case 'UPDATE_AVATAR_POSITION':
      newState = Object.assign({}, state, { position: state.position.clone().add(params.delta) });
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
        // This is an oldState mutation :'(
        // if troubles maybe use new_.Object3D(oldState.id)
        if (newState[params.id]) newState[params.id].visible = true;
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
  
  // currentSceneSetName: (state='', { type, payload, params }) => {
  //   return type === 'SET_SCENESET' ? params : state;
  // },
  
  // scenesObjectsIds: (state={}, { type, payload, params }) => {
  //   switch (type) {
    
  //   case 'SUCCESS_CREATE_OBJECT3D':
  //     const newState = JSON.parse(JSON.stringify(state)); // Yeah I know this sucks
  //     const { sceneSetName } = params;
      
  //     if (!newState[sceneSetName]) newState[sceneSetName] = [payload.id];
  //     else newState[sceneSetName].push(payload.id);
  //     return newState;
      
  //   default:
  //     return state;
  //   }
  // },
  
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

function deepCopy(a) {
  if (typeof a === 'object') {
    if (a === null) return null;
    else if (a instanceof Date) return new Date(a);
    else if (a instanceof RegExp) return new RegExp(a);
    else if (Array.isArray(a)) return a.map(i => deepCopy(i));
    else {
      const b = {};
      for (let k in a) {
        if (a.hasOwnProperty(k)) {
          b[k] = deepCopy(a[k]);
        }
      }
      return b;
    }
  } 
  else return a;
}
