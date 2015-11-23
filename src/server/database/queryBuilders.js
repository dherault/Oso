import r from 'rethinkdb';
import log from '../../utils/log';
import definitions from '../../models/';
import { capitalize } from '../../utils/text';

const table = r.table;

const aggregate = cursor => cursor.toArray();

const normalize = array => {  
  const obj = {};
  array.forEach(o => obj[o.id] = o);
  
  return obj;
};
  

function addDefaultCRUDBuilders(run, builders) {
  
  const CRUDbuilders = {};
  
  for (let model in definitions) {
    const { name, pluralName } = definitions[model];
    const suffix = capitalize(name);
    
    CRUDbuilders['read' + suffix] = ({ id }) => run(r.table(pluralName).get(id))
      .then(res => ({ [pluralName]: { [id]: res } }));
    CRUDbuilders['create' + suffix] = params => run(r.table(pluralName).insert(params))
      .then(result => {
        const p = Object.assign({}, params);
        const id = result.generated_keys[0];
        ['creationIp', 'createdAt', 'updatedAt', 'passwordHash'].map(key => delete p[key])
        return { [pluralName]: { [id]: { ...p, id } } };
      });
    CRUDbuilders['update' + suffix] = ({id, ...params }) => run(r.table(pluralName).get(id).update(Object.assign(params, { updatedAt: new Date().getTime() })))
      .then(result => ({}));
    CRUDbuilders['delete' + suffix] = ({ id }) => run(r.table(pluralName).get(id).delete());
  }
  
  return Object.assign(CRUDbuilders, builders);
}

/* Builders return a Promise that resolves the data */
export default run => addDefaultCRUDBuilders(run, {
  
  readAll: ({ table }) => run(r.table(table)).then(aggregate).then(normalize)
    .then(res => ({ [table]: res })),
  
  randomRow: ({ table }) => run(r.table(table).orderBy(row => r.random()).limit(1)),
});
