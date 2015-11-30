import through from 'through2';
import parseOSM from 'osm-pbf-parser';

const tagsWhiteList = {
  place: ['city', 'town'], 
  boundary: ['administrative'],
  waterway: ['river', 'riverbank'],
  highway: ['motorway', 'trunk', 'primary', 'secondary'],
};
const tagsWhiteListKeys = Object.keys(tagsWhiteList);

process.stdin
  .pipe(through.obj(function(buf, enc, next) {
    this.push(buf);
    next();
  }, function(next) {
    this.push(null);
    next();
  }))
  .pipe(parseOSM())
  .pipe(processData())
  .pipe(through.obj((osmData, enc, next) => {
    process.send({ osmData });
    next();
    process.exit(0);
  }));

function processData() {
  const osmData = {
    nodes: new Map(),
    ways: new Map(),
    relations: new Map(),
  };
  
  return through.obj((items, enc, next) => {
    items.forEach(item => {
      if (item.type === 'node') {
        osmData.nodes.set(item.id, item);
        return;
      }
      for (let key in item.tags) {
        if (tagsWhiteListKeys.indexOf(key) !== -1 && tagsWhiteList[key].indexOf(item.tags[key]) !== -1) {
          osmData[item.type + 's'].set(item.id, item);
          break;
        }
      }
    });
    next();
  }, function (next) {
      this.push(osmData);
      next();
  });
}