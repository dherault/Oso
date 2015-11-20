import bcrypt from 'bcrypt';
import route from 'koa-router';
import queryDatabase from './database/databaseMiddleware';
import log, {logError} from '../utils/log';
import actionCreators from '../redux/actionCreators';
  
export default function registerAPI(router) {
  
  const createReason = (code, msg, err) => ({code, msg, err});
  // Allows validation and params mutation before querying db
  const beforeQuery = {
    
    createUser: (request, params) => new Promise((resolve, reject) =>
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(createReason(500, 'createUser bcrypt.genSalt', err));
        
        bcrypt.hash(params.password, salt, (err, hash) => {
          if (err) return reject(createReason(500, 'createUser bcrypt.hash', err));
          
          params.picture = '';
          params.passwordHash = hash;
          params.ip = request.info.remoteAddress;
          delete params.password;
          resolve();
        });
      })
    ),
    
    // createUniverse: (request, params) => new Promise((resolve, reject) => {
    //   params.name = params.name.trim(),
    //   params.ip = request.info.remoteAddress;
    //   params.userId = JWT.decode(request.state.jwt).userId; // The real user id
    //   resolve();
    // }),
    
  };
  
  // ...
  const afterQuery = {
    
    // createUser: (request, params, result) => new Promise((resolve, reject) => {
    //   if (!result || !result.id) return reject(createReason(500, 'createUser no userId'));
      
    //   resolve({
    //     userId: result.id,
    //     expiration: new Date().getTime() + ttl,
    //   });
    // }),
  };
  
  // Dynamic construction of the API routes from actionCreator with API calls
  for (let acKey in actionCreators) {
    
    const getShape = actionCreators[acKey].getShape || undefined;
    const { intention, method, pathx, auth } = getShape ? getShape() : {};
    
    if (method && pathx) {
      const nothing = () => Promise.resolve();
      const before = beforeQuery[intention] || nothing;
      const after  = afterQuery[intention]  || nothing;
      
      router[method](pathx, function *(next) {
        
        console.log(this.request.body);
        // const params = method === 'post' ? request.payload : Object.keys(request.params).length === 1 && request.params.p ? request.params.p : request.params;
        
        // before(request, params).then(
        //   () => queryDatabase(intention, params).then(
        //     result => after(request, params, result).then(
        //       token => {
                
        //         response.source = result;
                
        //         response.send();
        //       },
              
        //       handleError.bind(null, response, 'afterQuery')
        //     ),
        //     err => handleError(response, 'queryDatabase', createReason(500, '', err))
        //   ),
        //   handleError.bind(null, response, 'beforeQuery')
        // );
      });
    }
  }

  function handleError(response, origin, reason) {
    
    const code = reason.code || 500;
    const msg = reason.msg || '';
    const err = reason.err;
    
    log('!!! Error while API', origin);
    logError(msg, err);
    log('Replying', code);
    
    response.source = JSON.stringify(code < 500 ? msg : 'Internal server error');
    response.code(code).send();
  }
}
