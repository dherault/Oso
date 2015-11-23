import fs from 'fs';
import koa from 'koa';
import router from 'koa-route';
import bodyParser from 'koa-bodyparser';

import log from '../utils/log';
import registerAPI from './API';
import config from '../../config';
import chainPromises from '../utils/chainPromises';
import webpackDevServer from './webpack/webpackDevServer';
import deleteDatabase from './database/utils/deleteDatabase';
import populateDatabase from './database/utils/populateDatabase';
import initializeDatabase from './database/utils/initializeDatabase';
import { openConnection, closeConnection } from './database/utils/connect';

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
  log(n, ctx.method, ctx.url, 'from', ctx.request.ip);
  ctx.body = html;
}));

chainPromises([
  // openConnection,
  // deleteDatabase,
  // initializeDatabase,
  // populateDatabase,
  // closeConnection
], config.rethinkdb).then(
  () => {
    app.listen(config.webServerPort);
    log(`Web server listening on port ${config.webServerPort}`);
  },
  err => console.error(err)
);

webpackDevServer();
