import r from 'rethinkdb';
// import log from '../../../shared/utils/logTailor';
import config from '../../../../config';
import chainPromises from '../../../shared/utils/chainPromises';


export default function initializeDatabaseP(connection) {
  
  return new Promise((resolve, reject) => {
    
    console.log('... Initializing database');
      
    r.dbList().run(connection, (err, result) => {
      if (err) return reject(err);
      
      const { rethinkdb: { db }, database : { tables } } = config;
      
      if (result.indexOf(db) === -1) chainPromises([
        () => r.dbCreate(db).run(connection),
        () => Promise.all(config.database.tables.map(table => {
          console.log(`... Creating table ${table}`);
          return r.tableCreate(table).run(connection);
        })),
      ]).then(() => resolve(connection), reject);
      
      else reject('Database already initialized.');
    });
  });
}
