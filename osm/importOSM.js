import fs from 'fs';
import through from 'through2';
import parseOSM from 'osm-pbf-parser';

const osmStream = parseOSM();
fs.createReadStream(process.argv[2])
.pipe(osmStream)
.pipe(through.obj((items, enc, next) => {
  items.forEach(item => {
      console.log('item=', item);
  });
  next();
}));
