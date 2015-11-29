export default function promiseMiddleware({ dispatch, getState }) {
  
  return next => action => {
    const { promise, types, params } = action;
    
    if (!promise) return next(action);
    
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({params, type: REQUEST});
    
    promise.then(
      payload => next({params, payload, type: SUCCESS}),
      payload => next({params, payload, type: FAILURE})
    );
  };
}
