import fs from 'fs';
import queryDatabase from '../databaseMiddleware';
import log from '../../../utils/log';
import { randomInteger } from '../../../utils/randomGenerators';

export default function populateDatabase(conn) {
  
  return new Promise((resolve, reject) => {
    
    resolve(conn);
    
  });
}
