import fs from 'fs';
import koa from 'koa';
import createRouter from 'koa-router';
import injectParsedBody from 'koa-bodyparser';
import r from 'rethinkdb';
import webpackDevServer from './webpack/webpackDevServer';
import log from '../utils/log';
import registerAPI from './API';
import config from '../../config';
import chainPromises from '../utils/chainPromises';
import deleteDatabase from './database/utils/deleteDatabase';
import populateDatabase from './database/utils/populateDatabase';
import initializeDatabase from './database/utils/initializeDatabase';

const app = koa();
const router = createRouter();

const WDSURI = `http://${config.publicIp}:${config.WDSPort}/`;
const html = fs.readFileSync('src/server/index.html', 'utf8').replace('</body>',
  `<script src="${WDSURI}webpack-dev-server.js"></script>` +
  `<script src="${WDSURI}static/bundle.js"></script>`
);

registerAPI(router);

let n = 0;
router.get('*', function *(){
  n++;
  console.log(n);
  this.body = html;
});

app
.use(injectParsedBody())

// Response time header
.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
})

// Logger
.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
})

.use(router.routes())
.use(router.allowedMethods());

r.connect(config.rethinkdb, (err, connection) => {
  if (err) throw err;
  
  chainPromises([
    // deleteDatabase,
    // initializeDatabase,
    // populateDatabase
  ], connection).then(
    () => {
      app.listen(config.webServerPort);
      console.log(`Web server listening on port ${config.webServerPort}`);
    },
    err => console.error(err)
  );
});

webpackDevServer();
