import fs from 'fs';
import queryDatabase from '../databaseMiddleware';
import log from '../../../shared/utils/log';
import { randomInteger } from '../../../shared/utils/randomGenerators';

export default function populateDatabase(conn) {
  
  return new Promise((resolve, reject) => {
    
    resolve();
    // const creationIp = '0.0.0.0';
    
    // const defaultUser = { // has no image
    //   creationIp,
    //   pseudo: 'admin',
    //   email: 'admin@aquest.tech',
    //   fullName: 'Super Admin',
    //   passwordHash: '$2a$10$m3jpaE2uelYFzoPTu/fG/eU5rTkmL0d8ph.eF3uQrdQE46UbhhpdW',
    // };
    
    // const defaultUniverse = {
    //   creationIp,
    //   name: 'Meta Aquest',
    //   description: 'Aquest is intriguing, right?',
    //   rules: 'Be nice please.',
    //   relatedUniverses: [],
    // };
    
    // const defaultBallots = [
    //   {
    //     content: 'Thanks',
    //     description: 'Say thank you.',
    //     value: 1,
    //   },
    //   {
    //     content: 'Agree',
    //     description: 'You definitely agree.',
    //     value: 1,
    //   },
    //   {
    //     content: 'Disagree',
    //     description: 'No estoy de acuerdo amigo.',
    //     value: 0,
    //   },
    //   {
    //     content: 'Irrelevant',
    //     description: 'This sould not be here.',
    //     value: -1,
    //   },
    //   {
    //     content: 'Shocking',
    //     description: 'This hurts the community.',
    //     value: -10,
    //   },
    // ];
    
    // log('... Inserting initial content');
    // log('... Default user:');
    
    // queryDatabase('createUser', defaultUser).then(
    //   user => {
        
    //     const userId = user.id;
        
    //     log('... Default ballots:');
        
    //     Promise.all(defaultBallots.map(ballot => 
    //       queryDatabase('createBallot', Object.assign({ userId }, ballot))
    //     )).then(
    //       ballots => {
    //         const path = 'src/server/s3/starting_images/'; // config ?
            
    //         fs.readdir(path, (err, files) => {
    //           if (err) return reject(err);
              
    //           log('... Default images:');
              
    //           Promise.all(files.map(file => new Promise((resolve, reject) =>
    //             processImage(fs.createReadStream(path + file)).then(({ name, url }) => 
    //               queryDatabase('createImage', { url, name, userId, creationIp }).then(resolve, reject)
    //             )
    //           ))).then(
    //             data => {
                  
    //               log('... Default universe:');
                  
    //               queryDatabase('createUniverse', Object.assign(defaultUniverse, {
    //                 userId, imageId: data[randomInteger(0, data.length - 1)].id
    //               })).then(resolve, reject);
    //             },
    //             reject
    //           );
    //         });
    //       },
    //       reject
    //     );
    //   },
    //   reject
    // );
  });
}
