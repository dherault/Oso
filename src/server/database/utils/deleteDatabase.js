import r from 'rethinkdb';
import log from '../../../utils/log';
import config from '../../../../config';

export default function deleteDatabase(connection) {
  
  return new Promise((resolve, reject) => {
      
    log(`... Deleting database`); 
    r.dbList().run(connection, (err, list) => {
      if (err) return reject(err);
      
      const { db } = config.rethinkdb;
      if (list.indexOf(db) !== -1) r.dbDrop(db).run(connection).then(
        () => {
          log(`... Database ${db} deleted`); 
          resolve(connection);
        },
        reject
      );
      else resolve(connection);
    });
  });
}
