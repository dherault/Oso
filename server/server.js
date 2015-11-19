import fs from 'fs';
import koa from 'koa';
import webpackDevServer from './dev/webpackDevServer';
import config from '../config';

webpackDevServer();

const app = koa();
const WDSURI = `http://${config.publicIp}:${config.WDSPort}/`;
const html = fs.readFileSync('server/index.html', 'utf8').replace('</body>',
  `<script src="${WDSURI}webpack-dev-server.js"></script>` +
  `<script src="${WDSURI}static/bundle.js"></script>`
);

let n = 0;
app.use(function *(){
  n++;
  console.log(n);
  this.body = html;
});

app.listen(config.webServerPort);

console.log(`Web server listening on port ${config.webServerPort}.`);
