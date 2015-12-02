import fs from 'fs';
import koa from 'koa';
import router from 'koa-route';
import bodyParser from 'koa-bodyparser';

import log from '../utils/log';
import registerAPI from './API';
import config from '../../config';
import webpackDevServer from './webpack/webpackDevServer';
import deleteDatabase from './database/utils/deleteDatabase';
import populateDatabase from './database/utils/populateDatabase';
import initializeDatabase from './database/utils/initializeDatabase';
import { openConnection, closeConnection } from './database/utils/connect';

console.log('Node', process.version, process.cwd());

const WDSURI = `http://${config.publicIp}:${config.WDSPort}/`;
const html = fs.readFileSync('src/server/index.html', 'utf8').replace('</body>',
  `<script src="${WDSURI}webpack-dev-server.js"></script>` +
  `<script src="${WDSURI}static/bundle.js"></script>`
);

const app = new koa();
app.use(bodyParser());
registerAPI(app, router);

let n = 0;

app.use(router.get('/images/:x', (ctx, x) => {
  n++;
  log(n, 'image', x, 'from', ctx.request.ip);
  
  if (!x) return;
  const a = x.split('.');
  
  switch (a[a.length - 1].toLowerCase()) {
    case 'jpg':
      ctx.set('content-type', 'image/jpeg');
      ctx.body = fs.readFileSync(__dirname + '/images/' + x);
      break;
    case 'png':
      ctx.set('content-type', 'image/png');
      ctx.body = fs.readFileSync(__dirname + '/images/' + x);
      break;
      
    default:
      return;
  }
}));

app.use(router.get('*', (ctx, next) => {
  n++;
  log(n, ctx.method, ctx.url, 'from', ctx.request.ip);
  ctx.body = html;
}));

Promise.resolve()
.then(openConnection.bind(0, config.rethinkdb))
.then(deleteDatabase)
.then(initializeDatabase)
.then(populateDatabase)
.then(closeConnection)
.then(
  () => {
    app.listen(config.webServerPort);
    log(`Web server listening on port ${config.webServerPort}`);
  },
  console.error
);

webpackDevServer();

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, p) => {
  unhandledRejections.set(p, reason);
  log('!!! unhandledRejection', p, reason);
});
process.on('rejectionHandled', p => {
  unhandledRejections.delete(p);
});
