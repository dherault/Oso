import fs from 'fs';
import r from 'rethinkdb';
import through from 'through2';
import parseOSM from 'osm-pbf-parser';

/* CONFIG */
const nItems = 4971855910;
// const osmFilePath = '/root/mount/planet-latest.osm.pbf';
const osmFilePath = '/root/oso/osm/BJ.pbf';
const tagsWhiteList = {
  place: ['city', 'town'], 
  boundary: ['administrative'],
  waterway: ['river', 'riverbank'],
  // highway: ['motorway', 'trunk', 'primary'],
};
const tagsWhiteListKeys = Object.keys(tagsWhiteList);
const dbConfig = {
  host: 'localhost',
  port: 28015,
  db: 'Oso_dev',
  timeout: 5,
};

/* INTERMEDIATE OUTPUT */
const nodeIds = [];
const nodes = new Map();
const ways = new Map();

/* PROCESSING */
let n = 0;
let nn = 0;
let d;
let dd = new Date().getTime();

const stream = fs.createReadStream(osmFilePath)
.pipe(parseOSM())
.pipe(through.obj((items, enc, next) => {
  // let m = 0;
  d = dd;
  n = items.length;
  nn += n;
  
  items.forEach(item => {
    if (item.type !== 'way') return;
    
    const { id, tags } = item;
    // console.log(n, item.type, item.tags);
    
    for (let key in tags) {
      if (tagsWhiteListKeys.indexOf(key) !== -1 && tagsWhiteList[key].indexOf(tags[key]) !== -1) {
        ways.set(id, item);
        break;
      }
    }
  });
  
  dd = new Date().getTime();
  
  console.log('ways', nn, (100 * n / nItems).toFixed(2) + '%', ways.size, ((dd - d) * (nItems - nn) / (n * 1000 * 60)).toFixed(0) + 'min left');
  next();
}));

stream.on('close', () => {
  console.log('phase 1 complete')
  let n = 0;
  let nn = 0;
  let d;
  let dd = new Date().getTime();
  const nodeIds = [];
  
  ways.forEach(way => way.refs.forEach(id => nodeIds.push(id)));
  console.log(nodeIds.length);
  
  const stream2 = fs.createReadStream(osmFilePath)
  stream2.pipe(parseOSM())
  .pipe(through.obj((items, enc, next) => {
    d = dd;
    n = items.length;
    nn += n;
    
    items.forEach(item => {
      if (item.type !== 'node') return;
      if (nodeIds.indexOf(item.id) !== -1) nodes.set(item.id, item);
    });
    
    dd = new Date().getTime();
    console.log('nodes', nn, (100 * n / nItems).toFixed(2) + '%', nodes.size, ((dd - d) * (nItems - nn) / (n * 1000 * 60)).toFixed(0) + 'min left');
    
    next();
  }));
  
  stream2.on('end', createOutput.bind(0, nodeIds))
})

function createOutput(nodeIds) {
  console.log(ways.size, nodes.size)
}
