import r from 'rethinkdb';
import log from '../../utils/log';
import definitions from '../../models/';
import { capitalize } from '../../utils/text';
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


// const createChat = (name, chattableId) => table('chats').insert(prepareInsertion({ name, chattableId }));

// const createHandleFrom = string => string.replace(/((?![a-zA-Z0-9~!_\-\.\*]).)/g, '_');

const aggregate = cursor => cursor.toArray();

const normalize = array => {  
  const obj = {};
  array.forEach(o => {
    obj[o.id] = o;
  });
  
  return obj;
};
  

function enhanceREST(run, builders) {
  
  const RESTbuilders = {};
  
  for (let model in definitions) {
    const { name, pluralName } = definitions[model];
    const suffix = capitalize(name);
    
    RESTbuilders['read' + suffix] = ({ id }) => run(r.table(pluralName).get(id))
      .then(res => ({ [pluralName]: { [id]: res } }));
    RESTbuilders['create' + suffix] = params => run(r.table(pluralName).insert(params))
      .then(result => {
        const p = Object.assign({}, params);
        const id = result.generated_keys[0];
        ['creationIp', 'createdAt', 'updatedAt', 'passwordHash'].map(key => delete p[key])
        return { [pluralName]: { [id]: { ...p, id } } };
      });
    RESTbuilders['update' + suffix] = ({id, ...params }) => run(r.table(pluralName).get(id).update(Object.assign(params, { updatedAt: new Date().getTime() })));
    RESTbuilders['delete' + suffix] = ({ id }) => run(r.table(pluralName).get(id).delete());
  }
  
  return Object.assign(RESTbuilders, builders);
}
/* Builders return a Promise that resolves the data */

export default run => enhanceREST(run, {
  
  readAll: ({ table }) => run(r.table(table)).then(aggregate).then(normalize).then(res => ({ [table]: res })),
  
  // /// CREATE USER
  // createUser: ({ pictureId, pseudo, email, passwordHash, creationIp }) => run(
    
  //   table('users').insert(prepareInsertion({
  //     pseudo, email, passwordHash, creationIp, pictureId, 
  //   }))
  // ).then(result => ({
  //   pseudo, email, pictureId, 
  //   id: result.generated_keys[0],
  // })),
  
  
  // RANDOM ROW
  randomRow: ({ table }) => run(r.table(table).orderBy(row => r.random()).limit(1))
  
});
