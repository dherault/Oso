import koa from 'koa';

const app = koa();

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(8080);

console.log('Yolo!');
