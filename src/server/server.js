import fs from 'fs';
import koa from 'koa';
import r from 'rethinkdb';
import webpackDevServer from './webpack/webpackDevServer';
import log from '../utils/log';
import config from '../../config';
import chainPromises from '../utils/chainPromises';
import deleteDatabase from './database/utils/deleteDatabase';
import populateDatabase from './database/utils/populateDatabase';
import initializeDatabase from './database/utils/initializeDatabase';

r.connect(config.rethinkdb, (err, connection) => {
  if (err) throw err;
  
  chainPromises([
    deleteDatabase,
    initializeDatabase,
    populateDatabase
  ], connection).then(
    () => {
      app.listen(config.webServerPort);
      console.log(`Web server listening on port ${config.webServerPort}`);
    },
    err => console.error(err)
  );
});

webpackDevServer();

const app = koa();
const WDSURI = `http://${config.publicIp}:${config.WDSPort}/`;
const html = fs.readFileSync('src/server/index.html', 'utf8').replace('</body>',
  `<script src="${WDSURI}webpack-dev-server.js"></script>` +
  `<script src="${WDSURI}static/bundle.js"></script>`
);

let n = 0;

// Response time header
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// Logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function *(){
  n++;
  console.log(n);
  this.body = html;
});
