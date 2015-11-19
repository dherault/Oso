import r from 'rethinkdb';
// import log from '../../../shared/utils/logTailor';
import config from '../../../../config';

export default function deleteDatabaseP(connection) {
  
  return new Promise((resolve, reject) => {
      
    console.log(`... Deleting database`); 
    r.dbList().run(connection, (err, list) => {
      if (err) return reject(err);
      
      const { db } = config;
      
      if (list.indexOf(db) !== -1) r.dbDrop(db).run(connection).then(
        () => {
          console.log(`... Database ${db} deleted`); 
          resolve(connection);
        },
        reject
      );
      else resolve(connection);
    });
  });
}
