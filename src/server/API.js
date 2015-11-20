import bcrypt from 'bcrypt';
import route from 'koa-route';
import queryDatabase from './database/databaseMiddleware';
import log, {logError} from '../utils/log';
import actionCreators from '../redux/actionCreators';
// import parse from 'co-body';
  
export default function registerAPI(app, router) {
  
  const createReason = (code, msg, err) => ({code, msg, err});
  // Allows validation and params mutation before querying db
  const beforeQuery = {
    
    createUser: (request, params) => new Promise((resolve, reject) =>
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(createReason(500, 'createUser bcrypt.genSalt', err));
        
        bcrypt.hash(params.password, salt, (err, hash) => {
          if (err) return reject(createReason(500, 'createUser bcrypt.hash', err));
          
          params.pictureId = 'no id yet';
          params.passwordHash = hash;
          params.creationIp = request.ip;
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
    const { intention, method, path, auth } = getShape ? getShape() : {};
    
    if (method && path) {
      const nothing = () => Promise.resolve();
      const before = beforeQuery[intention] || nothing;
      const after  = afterQuery[intention]  || nothing;
      
      app.use(router[method](path, ctx => new Promise(resolve => {
        
        const request = ctx.request;
        const params = method === 'post' ? ctx.request.body : ctx.request.query;
        
        console.log('API', request.url, params);
        
        before(request, params).then(
          () => queryDatabase(intention, params).then(
            result => after(request, params, result).then(
              token => {
                
                ctx.body = result;
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
}
