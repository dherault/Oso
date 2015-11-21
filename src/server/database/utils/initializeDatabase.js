import r from 'rethinkdb';
import log from '../../../utils/log';
import config from '../../../../config';
import definitions from '../../../models/';
import chainPromises from '../../../utils/chainPromises';

export default function initializeDatabase(connection) {
  
  return new Promise((resolve, reject) => {
    
    log('... Initializing database');
    
    r.dbList().run(connection, (err, result) => {
      if (err) return reject(err);
      
      const { rethinkdb: { db } } = config;
      const tables = [];
      
      for (let model in definitions) {
        const { pluralName, hasAndBelongToMany } = definitions[model];
        
        tables.push(pluralName);
        
        // (hasAndBelongToMany || []).map(ref => {
        //   const refTable = definitions[ref].pluralName;
        //   const jointTable = refTable < pluralName ? `${refTable}_${pluralName}` : `${pluralName}_${refTable}`;
          
        //   if (tables.indexOf(jointTable) === -1) tables.push(jointTable);
        // });
      }
      
      if (result.indexOf(db) === -1) chainPromises([
        () => r.dbCreate(db).run(connection),
        () => Promise.all(tables.map(table => {
          log(`... Creating table ${table}`);
          
          return r.tableCreate(table).run(connection);
        })),
      ]).then(
        () => {
          log(`... Database ${db} initialized`);
          resolve(connection);
        }, 
        reject
      );
      
      else reject('Database already initialized.');
    });
  });
}
