import bcrypt from 'bcrypt';
import route from 'koa-route';
import queryDatabase from './database/databaseMiddleware';
import log, {logError} from '../utils/log';
import actionCreators from '../state/actionCreators';
  
export default function registerAPI(app, router) {
  
  const createReason = (code, msg, err) => ({code, msg, err});
  // Allows validation and params mutation before querying db
  const beforeQuery = {
    
    createUser: (params, request) => new Promise((resolve, reject) =>
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(createReason(500, 'createUser bcrypt.genSalt', err));
        
        bcrypt.hash(params.password, salt, (err, hash) => {
          if (err) return reject(createReason(500, 'createUser bcrypt.hash', err));
          
          const modifiedParams = Object.assign({}, params, {
            passwordHash: hash,
          });
          delete modifiedParams.password;
          resolve(modifiedParams);
        });
      })
    ),
  };
  
  // ...
  const afterQuery = {
    
    // createUser: (result, params, request) => new Promise((resolve, reject) => {
    //   if (!result || !result.id) return reject(createReason(500, 'createUser no userId'));
      
    //   resolve({
    //     userId: result.id,
    //     expiration: new Date().getTime() + ttl,
    //   });
    // }),
  };
  
  const nothing = x => Promise.resolve(x);
  
  // Dynamic construction of the API routes from actionCreator with API calls
  for (let acKey in actionCreators) {
    
    const getShape = actionCreators[acKey].getShape || undefined;
    const { intention, method, path, auth } = getShape ? getShape() : {};
    
    if (method && path) {
      const before = enhanceREST(intention) || nothing;
      const after  = afterQuery[intention]  || nothing;
      
      app.use(router[method](path, ctx => new Promise(resolve => {
        
        const request = ctx.request;
        const params = method === 'post' ? ctx.request.body : ctx.request.query;
        
        console.log('API', request.url, params);
        
        before(params, request).then(
          modifiedParams => queryDatabase(intention, modifiedParams).then(
            result => after(result, modifiedParams, request).then(
              modifiedResult => {
                
                ctx.body = modifiedResult;
                resolve();
              },
              
              handleError.bind(null, 'afterQuery')
            ),
            err => handleError('queryDatabase', createReason(500, '', err))
          ),
          handleError.bind(null, 'beforeQuery')
        );
        
        function handleError(origin, reason) {
          
          const code = reason.code || 500;
          const msg = reason.msg || '';
          const err = reason.err;
          
          log('!!! Error while API', origin);
          logError(msg, err);
          log('Replying', code);
          
          ctx.response.status = code;
          resolve();
          // response.source = JSON.stringify(code < 500 ? msg : 'Internal server error');
          // response.code(code).send();
        }
      })));
    }
  }
  
  function enhanceREST(intention) {
    
    const before = beforeQuery[intention] || nothing;
    
    if (!/^(create|update)/.test(intention)) return before;
    else return (params, request) => new Promise((resolve, reject) => {
      before(params, request).then(
        modifiedParams => {
          const t = new Date().getTime();
          resolve(Object.assign(modifiedParams, {
            createdAt: t,
            updatedAt: t,
            creationIp: request.ip,
          }));
        },
        reject
      );
    });
  }
  
}
