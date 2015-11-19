import r from 'rethinkdb';
import createBuilders from './queryBuilders';
import log from '../../shared/utils/logTailor';
import config from '../../../config';


let connection;
const builders = createBuilders(run);

// TODO: handle deconnections
r.connect(config.rethinkdb, (err, conn) => {
  if (err) throw err;
  connection = conn;
});

// Runs a ReQL query
export function run(query) {
  
  return new Promise((resolve, reject) => 
    query.run(connection, (err, result) => {
      if (err) return reject(err);
      if (result.errors) return reject(result.first_error);
      
      resolve(result);
    })
  );
}

// Resolves data based on intention and params
export default function queryDatabase(intention, params) {
  const d = new Date();
  const runQuery = builders[intention];
  
  if (runQuery) {
    const query = runQuery(params);
    query.then(() => log(`+++ <-- ${intention} after ${new Date() - d}ms`));
    
    // log ('+++ ', intention, params)
    
    return query;
  }
  else return Promise.reject(`No query builder found for your intention: ${intention}`);
}
