import fs from 'fs';
import koa from 'koa';
import router from 'koa-route';
import bodyParser from 'koa-bodyparser';
import r from 'rethinkdb';
import webpackDevServer from './webpack/webpackDevServer';
import log from '../utils/log';
import registerAPI from './API';
import config from '../../config';
import chainPromises from '../utils/chainPromises';
import deleteDatabase from './database/utils/deleteDatabase';
import populateDatabase from './database/utils/populateDatabase';
import initializeDatabase from './database/utils/initializeDatabase';

const app = new koa();
app.use(bodyParser());

const WDSURI = `http://${config.publicIp}:${config.WDSPort}/`;
const html = fs.readFileSync('src/server/index.html', 'utf8').replace('</body>',
  `<script src="${WDSURI}webpack-dev-server.js"></script>` +
  `<script src="${WDSURI}static/bundle.js"></script>`
);

let n = 0;
registerAPI(app, router);
app.use(router.get('*', (ctx, next) => {
  n++;
  console.log(n);
  ctx.body = html;
}))

// Response time header
.use((ctx, next) => {
  var start = new Date;
  return next().then(() => {
    var ms = new Date - start;
    ctx.set('X-Response-Time', ms + 'ms');
  });
})

// Logger
.use((ctx ,next) => {
  var start = new Date;
  return next().then(() => {
    var ms = new Date - start;
    console.log('%s %s - %s', ctx.method, ctx.url, ms);
  });
})


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
