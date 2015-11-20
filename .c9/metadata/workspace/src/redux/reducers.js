{"filter":false,"title":"reducers.js","tooltip":"/src/redux/reducers.js","undoManager":{"mark":20,"position":20,"stack":[[{"start":{"row":0,"column":25},"end":{"row":0,"column":34},"action":"remove","lines":["logTailor"],"id":2},{"start":{"row":0,"column":25},"end":{"row":0,"column":26},"action":"insert","lines":["l"]}],[{"start":{"row":0,"column":26},"end":{"row":0,"column":27},"action":"insert","lines":["o"],"id":3}],[{"start":{"row":0,"column":27},"end":{"row":0,"column":28},"action":"insert","lines":["g"],"id":4}],[{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"remove","lines":["import _cloneDeep from 'lodash.clonedeep';",""],"id":5}],[{"start":{"row":1,"column":0},"end":{"row":1,"column":3},"action":"insert","lines":["// "],"id":6}],[{"start":{"row":2,"column":0},"end":{"row":2,"column":3},"action":"insert","lines":["// "],"id":7}],[{"start":{"row":3,"column":0},"end":{"row":3,"column":3},"action":"insert","lines":["// "],"id":8}],[{"start":{"row":3,"column":0},"end":{"row":3,"column":3},"action":"remove","lines":["// "],"id":9}],[{"start":{"row":3,"column":0},"end":{"row":3,"column":3},"action":"insert","lines":["// "],"id":10}],[{"start":{"row":7,"column":2},"end":{"row":7,"column":5},"action":"insert","lines":["// "],"id":11},{"start":{"row":8,"column":2},"end":{"row":8,"column":5},"action":"insert","lines":["// "]},{"start":{"row":9,"column":2},"end":{"row":9,"column":5},"action":"insert","lines":["// "]},{"start":{"row":10,"column":2},"end":{"row":10,"column":5},"action":"insert","lines":["// "]},{"start":{"row":12,"column":2},"end":{"row":12,"column":5},"action":"insert","lines":["// "]},{"start":{"row":13,"column":2},"end":{"row":13,"column":5},"action":"insert","lines":["// "]},{"start":{"row":14,"column":2},"end":{"row":14,"column":5},"action":"insert","lines":["// "]},{"start":{"row":15,"column":2},"end":{"row":15,"column":5},"action":"insert","lines":["// "]},{"start":{"row":16,"column":2},"end":{"row":16,"column":5},"action":"insert","lines":["// "]},{"start":{"row":18,"column":2},"end":{"row":18,"column":5},"action":"insert","lines":["// "]},{"start":{"row":19,"column":2},"end":{"row":19,"column":5},"action":"insert","lines":["// "]},{"start":{"row":20,"column":2},"end":{"row":20,"column":5},"action":"insert","lines":["// "]},{"start":{"row":21,"column":2},"end":{"row":21,"column":5},"action":"insert","lines":["// "]},{"start":{"row":22,"column":2},"end":{"row":22,"column":5},"action":"insert","lines":["// "]},{"start":{"row":23,"column":2},"end":{"row":23,"column":5},"action":"insert","lines":["// "]},{"start":{"row":25,"column":2},"end":{"row":25,"column":5},"action":"insert","lines":["// "]},{"start":{"row":26,"column":2},"end":{"row":26,"column":5},"action":"insert","lines":["// "]},{"start":{"row":28,"column":2},"end":{"row":28,"column":5},"action":"insert","lines":["// "]},{"start":{"row":29,"column":2},"end":{"row":29,"column":5},"action":"insert","lines":["// "]},{"start":{"row":30,"column":2},"end":{"row":30,"column":5},"action":"insert","lines":["// "]},{"start":{"row":31,"column":2},"end":{"row":31,"column":5},"action":"insert","lines":["// "]},{"start":{"row":32,"column":2},"end":{"row":32,"column":5},"action":"insert","lines":["// "]},{"start":{"row":34,"column":2},"end":{"row":34,"column":5},"action":"insert","lines":["// "]},{"start":{"row":35,"column":2},"end":{"row":35,"column":5},"action":"insert","lines":["// "]}],[{"start":{"row":78,"column":0},"end":{"row":240,"column":0},"action":"remove","lines":["  chats: (state={}, action) => {","    const {type} = action;","    ","    switch (type) {","      ","    case 'SUCCESS_READ_CHAT_OFFSET':","      ","      return ((action) => {","        const chatId = action.payload && action.payload.id ? parseInt(action.payload.id, 10) : action.params ? parseInt(action.params, 10) : false;","        const newState = _cloneDeep(state);","        ","        if (action.payload.messages.length) newState[chatId].messages = action.payload.messages.concat(newState[chatId].messages);","        ","        return newState;","      })(action);","      ","    case 'SUCCESS_READ_CHAT':","      ","      return ((action) => {","        const chatId = action.payload && action.payload.id ? parseInt(action.payload.id, 10) : action.params ? parseInt(action.params, 10) : false;","        const newState = _cloneDeep(state);","        newState[chatId] = Object.assign({}, newState[chatId], action.payload);","        ","        return newState;","      })(action);","      ","    case 'EMIT_CREATE_MESSAGE':","      ","      return ((action) => {","        const chatId = parseInt(action.payload.chatId, 10);","        const newState = _cloneDeep(state);","        ","        newState[chatId].messages.push(action.payload.message);","        ","        return newState;","      })(action);","      ","    case 'RECEIVE_MESSAGE_OWNER':","      ","      return ((action) => {","        const chatId = parseInt(action.payload.chatId, 10);","        const { message, lcId } = action.payload;","        const messageIndex = state[chatId].messages.findIndex(({id}) => id === lcId);","        ","        if (messageIndex !== -1) { ","          const newState = _cloneDeep(state);","          newState[chatId].messages[messageIndex] = message; // must enable the ui to know if the message was succesfully delivered or not","          ","          return newState;","        }","        ","        return state;","      })(action);","      ","    case 'RECEIVE_MESSAGE':","      ","      return ((action) => {","        const chatId = parseInt(action.payload.chatId, 10);","        const { message } = action.payload;","        const newState = _cloneDeep(state);","        ","        newState[chatId].messages.push(message);","        ","        return newState;","      })(action);","       ","    case 'EMIT_JOIN_CHAT':","      ","      return ((action) => {","        const chatId = parseInt(action.payload, 10);","        const newState = _cloneDeep(state);","        ","        if (newState[chatId] && !newState[chatId].users) {","          newState[chatId] = Object.assign({}, newState[chatId], {users: []});","        } else if (!newState[chatId]) {","          newState[chatId] = {users: []};","        }","        ","        return newState;        ","      })(action);","            ","    case 'RECEIVE_JOIN_CHAT_OWNER':","      ","      return ((action) => {","        const chatId = parseInt(action.payload.chatId, 10);","        const { userList } = action.payload;","        const newState = _cloneDeep(state);","        ","        newState[chatId] = Object.assign({}, newState[chatId], {users: userList});","        ","        return newState;","      })(action);","      ","    case 'RECEIVE_JOIN_CHAT':","      ","      return ((action) => {","        const chatId = parseInt(action.payload.chatId, 10);","        const { userId } = action.payload;","        const newState = _cloneDeep(state);","        ","        newState[chatId].users.push(userId);","        ","        return newState;","      })(action);","    ","    case 'EMIT_LEAVE_CHAT':","      ","      return ((action) => {","        const chatId = parseInt(action.payload, 10);","        const newState = _cloneDeep(state);","        ","        delete newState[chatId].users;  ","        ","        return newState;      ","      })(action);","      ","    case 'RECEIVE_LEAVE_CHAT':","      ","      return ((action) => {","        const chatId = parseInt(action.payload.chatId, 10);","        const {userId} = action.payload;","        const newState = _cloneDeep(state);","        ","        // remove the user from the user list","        if (newState[chatId].users && newState[chatId].users.length) newState[chatId].users.splice(newState[chatId].users.indexOf(userId), 1);","        ","        return newState;","      })(action);","      ","    default:","      return state;","    }","  },","  ","  topics: (state={}, {type, payload, params}) => {","    let newState;","    switch (type) {","      ","    case 'SUCCESS_READ_INVENTORY':","      newState = Object.assign({}, state);","      payload.forEach(topic => newState[topic.id] = topic);","      return newState;","      ","    case 'SUCCESS_READ_TOPIC':","      return Object.assign({}, state, {[payload.id]: payload});","      ","    case 'SUCCESS_READ_TOPIC_ATOMS':","      newState = Object.assign({}, state);","      newState[params].atoms = payload;","      return newState;","      ","    case 'SUCCESS_CREATE_TOPIC':","      return Object.assign({}, state, {[payload.id]: payload});","      ","    default:","      return state;","    }","  },","  ","  // router: (state={}, action) => routerStateReducer(state, action),","  ","  lastError: (state=false, action) => isAPIFailure(action) ? action.payload : false,",""],"id":12}],[{"start":{"row":78,"column":0},"end":{"row":79,"column":0},"action":"remove","lines":["  ",""],"id":13}],[{"start":{"row":7,"column":0},"end":{"row":36,"column":0},"action":"remove","lines":["  // session: (state={}, action) => {","  //   const { userId, exp, redirection } = state;","  //   const { type, payload } = action;","  //   log('.R. ' + type); // Please keep this line in the first reducer","    ","  //   if (type === 'SUCCESS_LOGIN' || type === 'SUCCESS_CREATE_USER') return {","  //     redirection,","  //     userId: payload.id,","  //     exp: new Date().getTime() + sessionDuration,","  //   };","    ","  //   // If the API answers 200 then we renew the session expiration","  //   if (isAPISuccess(action)) return {","  //     userId,","  //     redirection,","  //     exp: new Date().getTime() + sessionDuration,","  //   };","    ","  //   // If the API answers 401 or user logs out then we kill the session","  //   if (isAPIUnauthorized(action) || type === 'LOGOUT') return {};","    ","  //   if (type === 'SET_REDIRECTION') return {","  //     exp,","  //     userId,","  //     redirection: payload,","  //   };","    ","  //   return state;","  // },",""],"id":14}],[{"start":{"row":7,"column":0},"end":{"row":8,"column":0},"action":"remove","lines":["  ",""],"id":15}],[{"start":{"row":1,"column":0},"end":{"row":4,"column":0},"action":"remove","lines":["// import { sessionDuration } from '../../config/dev_shared';","// import { routerStateReducer } from 'redux-router';","// import { isAPIUnauthorized, isAPISuccess, isAPIFailure } from './actionCreators';",""],"id":16}],[{"start":{"row":4,"column":41},"end":{"row":5,"column":0},"action":"insert","lines":["",""],"id":17},{"start":{"row":5,"column":0},"end":{"row":5,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":5,"column":4},"end":{"row":6,"column":69},"action":"insert","lines":["","    log('.R. ' + type); // Please keep this line in the first reducer"],"id":18}],[{"start":{"row":6,"column":69},"end":{"row":7,"column":0},"action":"insert","lines":["",""],"id":19},{"start":{"row":7,"column":0},"end":{"row":7,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":6,"column":27},"end":{"row":6,"column":33},"action":"remove","lines":["Please"],"id":20}],[{"start":{"row":6,"column":27},"end":{"row":6,"column":28},"action":"remove","lines":[" "],"id":21}],[{"start":{"row":0,"column":18},"end":{"row":0,"column":19},"action":"insert","lines":["."],"id":22}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":0,"column":19},"end":{"row":0,"column":19},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":39,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1447974924971,"hash":"6c4476deff6c26530333b83ca4e6849ec7ef771c"}