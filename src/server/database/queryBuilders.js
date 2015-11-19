import r from 'rethinkdb';
// import log from '../../shared/utils/logTailor';
// import { topicsLoadLimit, messagesLoadLimit, universesLoadLimit } from '../../../config/dev_app';

const table = r.table;

/* Shared functions among builders */

// const prepareUniverse = q => q.merge(universe => ({
//   ballots: table('ballots').getAll(r.args(universe('relatedBallots'))).coerceTo('array'),
//   imageUrl: table('images').get(r.args(universe('imageId')))('url')
// })).without('imageId', 'userId', 'creationIp', 'createdAt', 'updatedAt');

// const addVotesTo = q => q.merge(votable => ({
//   votes: table('votes').filter({ votableId: votable('id')})
// }));

// Adds timestamps and replaces undefined with null
const prepareInsertion = obj => {
  const d = new Date().getTime();
  const o = Object.assign({
    createdAt: d,
    updatedAt: d,
  }, obj);
  
  Object.keys(o).forEach(key => {
    if (o.hasOwnProperty(key) && o[key] === undefined) o[key] = null;
  });
  
  return o;
};

// const createChat = (name, chattableId) => table('chats').insert(prepareInsertion({ name, chattableId }));

// const createHandleFrom = string => string.replace(/((?![a-zA-Z0-9~!_\-\.\*]).)/g, '_');

const aggregate = cursor => cursor.toArray();

const normalize = cursor => {  
  const obj = {};
  cursor.toArray().forEach(o => {
    obj[o.id] = o;
  });
  
  return obj;
};
  

/* Builders return a Promise that resolves the data */

export default run => ({
  
  
  // // READ USER
  // readUser: ({ emailOrPseudo }) => run(
    
  //   table('users')
  //   .filter(user => r.or(user('email').eq(emailOrPseudo), user('pseudo').eq(emailOrPseudo)))
  //   .limit(1)
  //   .merge(user => ({
  //     imageUrl: table('images').get(r.args(user('imageId')))('url'),
  //   }))
  //   .without('creationIp', 'imageId')
  // ),
  
  // // READ UNIVERSES
  // readUniverses: () => run(prepareUniverse(
    
  //   table('universes')
  //   .limit(universesLoadLimit)
  // )).then(normalize),
  
  
  // // READ UNIVERSE BY HANDLE
  // readUniverseByHandle: ({ handle }) => run(prepareUniverse(
    
  //   table('universes')
  //   .filter({ handle })
  //   .limit(1)
  // )),
  
  
  // // READ CHATS
  // readChats: ({ chattableId }) => run(
    
  //   table('chats')
  //   .filter({ chattableId })
  //   .merge(chat => ({
  //     messages: addVotesTo(
  //       table('messages')
  //       .filter({ chatId: chat('id') })
  //       .orderBy('createdAt')
  //       .limit(messagesLoadLimit)
  //     ),
  //   }))
  //   .without('updatedAt')
  // ).then(normalize),
    
  
  // // READ MESSAGES
  // readMessages: ({ chatId, lastMessageId }) => {
    
  //   const x = table('messages').filter({ chatId }).orderBy('createdAt');
  //   const i = x.offsetsOf(lastMessageId);
    
  //   return run(addVotesTo(
  //     x.slice(i, i + messagesLoadLimit)
  //   )).then(aggregate);
      
  //   // Which is better ?
  //     // x
  //     // // .skip(x.offsetsOf(r.row('id').eq(lastMessageId)))
  //     // .skip(x.offsetsOf(lastMessageId))
  //     // .limit(messagesLoadLimit)
  //   // ),
  // },
  
  
  // // READ TOPICS
  // readTopics: ({ universeId }) => run(addVotesTo(
    
  //   table('topics')
  //   .filter({ universeId })
  //   .orderBy('createdAt')
  //   .limit(topicsLoadLimit)
  //   .without('atoms', 'creationIp')
  // )).then(aggregate),

  
  // // READ TOPIC
  // readTopic: ({ topicId }) => run(addVotesTo(
    
  //   table('topics').get(topicId).without('creationIp')
  // )),
  
  // // READ TOPIC ATOMS
  // readTopicAtoms: ({ topicId }) => run(
    
  //   table('topics').get(topicId)('atoms')
  // ),
  
  
  // // CREATE UNIVERSE
  // createUniverse: ({ userId, imageId, name, description, rules, relatedUniverses, creationIp }) => new Promise((resolve, reject) => {
  //   const handle = createHandleFrom(name);
  //   const newBallot = { 
  //     userId,
  //     value: 1,
  //     content: name,
  //     description: 'Accurate', // ?
  //   };
    
  //   Promise.all([
  //     run(table('ballots').orderBy('createdAt').limit(5).without('createdAt', 'updatedAt', 'userId')),
  //     run(table('ballots').insert(prepareInsertion(newBallot))),
  //   ])
  //   .then(
  //     ([r1, r2]) => run(table('universes').insert(prepareInsertion({ 
  //       userId, imageId, name, description, rules, relatedUniverses, creationIp, handle,
  //       relatedBallots: r1.map(b => b.id).concat([r2.generated_keys[0]])
  //     })))
  //     .then(
  //       r3 => {
  //         const id = r3.generated_keys[0];
  //         run(createChat(name + ' Agora', id))
  //         .then(
  //           () => resolve({
  //             // imageUrl is missing, delegated to client.
  //             id, name, description, rules, relatedUniverses, handle,
  //             ballots: [r2.generated_keys[0]].concat(r1),
  //           }), 
  //           reject
  //         );
  //       },
  //       reject
  //     ),
  //     reject
  //   );
  // }),
  
  
  // // CREATE TOPIC
  // createTopic: ({ userId, universeId, title, atoms, creationIp }) => new Promise((resolve, reject) => {
  //   const handle = createHandleFrom(title);
    
  //   run(
  //     table('topics').insert(prepareInsertion({
  //       userId, universeId, title, atoms, creationIp, handle,
  //     }))
  //   ).then(
  //     result => {
  //       const id = result.generated_keys[0];
        
  //       run(createChat(title + ' Discution', id)).then(
  //         () => resolve({
  //           id, userId, universeId, title, atoms, handle,
  //         }), 
  //         reject
  //       );
  //     },
  //     reject
  //   );
  // }),
  
  
  // // CREATE USER
  // createUser: ({ pictureId, pseudo, email, passwordHash, creationIp }) => run(
    
  //   table('users').insert(prepareInsertion({
  //     pseudo, email, passwordHash, creationIp, pictureId, 
  //   }))
  // ).then(result => ({
  //   pseudo, email, pictureId, 
  //   id: result.generated_keys[0],
  // })),
  
  
  // // CREATE MESSAGE
  // createMessage: ({ userId, chatId, atom }) => run(
    
  //   table('messages').insert(prepareInsertion({
  //     userId, chatId, atom,
  //   }))
  // ).then(result => ({
  //   userId, chatId, atom,
  //   id: result.generated_keys[0]
  // })),
  
  
  // // CREATE IMAGE
  // createImage: ({ userId, name, url, creationIp }) => run(
    
  //   table('images').insert(prepareInsertion({
  //     userId, name, url, creationIp,
  //   }))
  // ).then(result => ({
  //   name, url,
  //   id: result.generated_keys[0]
  // })),
  
  
  // // CREATE BALLOT
  // createBallot: ({ userId, content, value, description }) => run(
  
  //   table('ballots').insert(prepareInsertion({
  //     userId, content, value, description
  //   }))
  // ).then(result => ({
  //   userId, content, value, description,
  //   id: result.generated_keys[0]
  // })),
  
  
  // RANDOM ROW
  randomRow: ({ table }) => run(r.table(table).orderBy(row => r.random()).limit(1))
  
});
