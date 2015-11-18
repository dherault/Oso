import fs from 'fs';
import koa from 'koa';
import devServer from './dev/dev_server';

devServer();

const app = koa();
const HTML = fs.readFileSync('server/index.html', 'utf8');

let n = 0;
app.use(function *(){
  n++;
  console.log(n);
  this.body = HTML;
});

app.listen(8080);

console.log('Yolo!');
