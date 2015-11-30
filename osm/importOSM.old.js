import fs from 'fs';
import r from 'rethinkdb';
import through from 'through2';
import parseOSM from 'osm-pbf-parser';

/* CONFIG */
const osmFilePath = '/root/mount/planet-latest.osm.pbf';
const tagsWhiteList = {
  place: ['city', 'town'], 
  boundary: ['administrative'],
  waterway: ['river', 'riverbank'],
  highway: ['motorway', 'trunk', 'primary', 'secondary'],
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
const ways = new Map();
const relations = new Map();


/* PROCESSING */
let n = 0;
const _node = 'node';
const osmStream = parseOSM();

fs.createReadStream(osmFilePath)
.pipe(osmStream)
.pipe(through.obj((items, enc, next) => {
  // let m = 0;
  items.forEach(item => {
    // const { type, id, tags } = item;
    // m++;
    // console.log(n, item.type, item.tags);
    // if (item.type === _node) return;
    
    // for (let key in item.tags) {
    //   if (tagsWhiteListKeys.indexOf(key) !== -1 && tagsWhiteList[key].indexOf(item.tags[key]) !== -1) {
    //     break;
    //   }
    // }
  });
  console.log('yo');
  next();
}));
