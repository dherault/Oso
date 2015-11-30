import fs from 'fs';
import { cpus } from 'os';
import { fork } from 'child_process';
import r from 'rethinkdb';
import through from 'through2';
import parseOSM from 'osm-pbf-parser';

const numCPUs = cpus().length;
const workers = [];
const idleWorkers = [];
let idleCallback;


const osmFilePath = '/root/mount/planet-latest.osm.pbf';
const nodes = new Map();
const ways = new Map();
const relations = new Map();

const dbConfig = {
  host: 'localhost',
  port: 28015,
  db: 'Oso_dev',
  timeout: 5,
};

function createWorker(proc) {
  let worker;
  
  const stream = through.obj(function(blob, enc, next) {
    idleWorkers.push(worker);
    this.push(blob);
    next();
    
    if (idleCallback) {
      const cb = idleCallback;
      idleCallback = null;
      cb();
    }
  });
  
  stream
    .pipe(new parseOSM.BlobEncoder())
    .pipe(proc.stdin);

  worker = {
    write: blob => blob ? stream.write(blob) : stream.end(),
  };
  
  workers.push(worker);

  proc.on('message', ({ osmData }) => {
    if (osmData) {
      
      osmData.nodes.forEach((val, key) => {
        nodes.set(key, val);
      });
      osmData.ways.forEach((val, key) => {
        ways.set(key, val);
      });
      osmData.relations.forEach((val, key) => {
        relations.set(key, val);
      });
      console.log('msg', osmData.nodes.size, osmData.ways.size, osmData.relations.size);
    }
  });

  proc.stderr.pipe(process.stderr);
  proc.on('exit', (code, signal) => {
    if (code !== 0) console.error('worker', proc.pid, 'died with', code);
    
    workers.shift();  // Remove unrelated worker for counting
    if (workers.length < 1) {
      console.log("Complete!", nodes.size, ways.size, relations.size);
      process.exit(1);
    }
  });
}


// Fork workers.
for (let i = 0; i < numCPUs; i++) {
  createWorker(fork('./p_importOSM_worker', { silent: true }));
}


fs.createReadStream(osmFilePath)
.pipe(new parseOSM.BlobParser())
.pipe(through.obj((blob, enc, next) => {
  if (blob.type === 'OSMHeader') {
    workers.forEach(w => w.write(blob));
    next();
  } else {
    const write = () => {
      const worker = idleWorkers.shift();
      if (idleCallback) console.warn("Previous idleCallback found");
      if (worker) {
        idleCallback = next;
        worker.write(blob);
      } 
      else idleCallback = write;
    };
    write();
  }
}, next => {
  workers.forEach(w => w.write(null));
  next();
}));