import log from '../utils/log';

export default {
  
  users: (state={}, {type, payload}) => {
    
    log('.R. ' + type); // keep this line in the first reducer
    
    switch (type) {
      
    case 'SUCCESS_CREATE_USER':
      return Object.assign({}, state, {[payload.id]: payload});
      
    case 'SUCCESS_LOGIN':
      return Object.assign({}, state, {[payload.id]: payload});
      
    default:
      return state;
    }
  },
  
  universes: (state={}, {type, payload, params}) => {
    let newState;
    switch (type) {
      
    case 'SUCCESS_READ_UNIVERSE':
      return Object.assign({}, state, {[payload.id]: payload});
  
    case 'SUCCESS_READ_UNIVERSES':
      newState = Object.assign({}, state);
      payload.forEach(universe => {
        if (!newState[universe.id]) newState[universe.id] = universe;
      });
      return newState;
      
    case 'SUCCESS_READ_INVENTORY':
      newState = Object.assign({}, state);
      newState[params].lastInventoryUpdate = new Date().getTime();
      return newState;
    
    case 'SUCCESS_CREATE_UNIVERSE':
      return Object.assign({}, state, {[payload.id]: payload});
    
    default:
      return state;
    }
  },
  
  // Doit être exporté en dernier pour activer les side effects après la reduction des précédants
  records: (state=[], action) => [...state, Object.assign({date: new Date().getTime()}, action)]
};
