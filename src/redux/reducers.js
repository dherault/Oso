import log from '../utils/log';

export default {
  
  users: (state={}, {type, payload, params}) => {
    
    log('.R. ' + type); // keep this line in the first reducer
    
    switch (type) {
      
    // case 'SUCCESS_READ_USER':
    //   return Object.assign({}, state, {[payload.id]: payload});
      
    default:
      return enhanceREST(state, {type, payload, params}, 'USER');
    }
  },
  
  cities: (state={}, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return enhanceREST(state, {type, payload, params}, 'CITY');
    }
  },
  
  agents: (state={}, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return enhanceREST(state, {type, payload, params}, 'AGENT');
    }
  },
  
  jobs: (state={}, {type, payload, params}) => {
    
    switch (type) {
      
    default:
      return enhanceREST(state, {type, payload, params}, 'JOB');
    }
  },
  
  skills: (state={}, {type, payload, params}) => {
    
    switch (type) {
    
    default:
      return enhanceREST(state, {type, payload, params}, 'SKILL');
    }
  },
  
  records: (state=[], action) => [...state, Object.assign({date: new Date().getTime()}, action)]
};


function enhanceREST (state, { type, payload, params }, reducerName) {
  
  const bingo = ['READ', 'CREATE', 'UPDATE', 'DELETE'].map(x => `SUCCESS_${x}_${reducerName}`);
  
  if (type === 'SUCCESS_READ_ALL' && params.table.startsWith(reducerName.toLowerCase())) return Object.assign({}, payload);
  
  const i = bingo.indexOf(type);
  
  switch (i) {
    
    case -1:
      return state;
      
    case 0:
    case 1:
      return Object.assign({}, state, {[payload.id]: payload});
      
    default:
      return state;
  }
  
}
