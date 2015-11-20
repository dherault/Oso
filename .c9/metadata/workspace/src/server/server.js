{"changed":true,"filter":false,"title":"server.js","tooltip":"/src/server/server.js","value":"import fs from 'fs';\nimport koa from 'koa';\nimport createRouter from 'koa-router';\nimport injectParsedBody from 'koa-bodyparser';\nimport r from 'rethinkdb';\nimport webpackDevServer from './webpack/webpackDevServer';\nimport log from '../utils/log';\nimport registerAPI from './API';\nimport config from '../../config';\nimport chainPromises from '../utils/chainPromises';\nimport deleteDatabase from './database/utils/deleteDatabase';\nimport populateDatabase from './database/utils/populateDatabase';\nimport initializeDatabase from './database/utils/initializeDatabase';\n\nconst app = koa();\nconst router = createRouter();\n\nconst WDSURI = `http://${config.publicIp}:${config.WDSPort}/`;\nconst html = fs.readFileSync('src/server/index.html', 'utf8').replace('</body>',\n  `<script src=\"${WDSURI}webpack-dev-server.js\"></script>` +\n  `<script src=\"${WDSURI}static/bundle.js\"></script>`\n);\n\nregisterAPI(router);\n\nlet n = 0;\nrouter.get('*', function *(){\n  n++;\n  console.log(n);\n  this.body = html;\n});\n\napp\n.use(injectParsedBody())\n\n// Response time header\n.use(function *(next){\n  var start = new Date;\n  yield next;\n  var ms = new Date - start;\n  this.set('X-Response-Time', ms + 'ms');\n})\n\n// Logger\n.use(function *(next){\n  var start = new Date;\n  yield next;\n  var ms = new Date - start;\n  console.log('%s %s - %s', this.method, this.url, ms);\n})\n\n.use(router.routes())\n.use(router.allowedMethods());\n\nr.connect(config.rethinkdb, (err, connection) => {\n  if (err) throw err;\n  \n  chainPromises([\n    // deleteDatabase,\n    // initializeDatabase,\n    // populateDatabase\n  ], connection).then(\n    () => {\n      app.listen(config.webServerPort);\n      console.log(`Web server listening on port ${config.webServerPort}`);\n    },\n    err => console.error(err)\n  );\n});\n\nwebpackDevServer();\n","undoManager":{"mark":96,"position":100,"stack":[[{"start":{"row":3,"column":29},"end":{"row":3,"column":46},"action":"insert","lines":["'koa-body-parser'"],"id":1265}],[{"start":{"row":3,"column":46},"end":{"row":3,"column":47},"action":"insert","lines":[";"],"id":1266}],[{"start":{"row":65,"column":24},"end":{"row":66,"column":0},"action":"insert","lines":["",""],"id":1267}],[{"start":{"row":58,"column":0},"end":{"row":58,"column":3},"action":"remove","lines":["app"],"id":1268}],[{"start":{"row":55,"column":2},"end":{"row":55,"column":3},"action":"remove","lines":[";"],"id":1269}],[{"start":{"row":65,"column":0},"end":{"row":65,"column":3},"action":"remove","lines":["app"],"id":1270}],[{"start":{"row":63,"column":2},"end":{"row":63,"column":3},"action":"remove","lines":[";"],"id":1271}],[{"start":{"row":66,"column":29},"end":{"row":66,"column":30},"action":"remove","lines":[";"],"id":1272}],[{"start":{"row":66,"column":29},"end":{"row":67,"column":0},"action":"insert","lines":["",""],"id":1273}],[{"start":{"row":67,"column":0},"end":{"row":67,"column":1},"action":"insert","lines":["."],"id":1274}],[{"start":{"row":67,"column":1},"end":{"row":67,"column":2},"action":"insert","lines":["u"],"id":1275}],[{"start":{"row":67,"column":2},"end":{"row":67,"column":3},"action":"insert","lines":["s"],"id":1276}],[{"start":{"row":67,"column":3},"end":{"row":67,"column":4},"action":"insert","lines":["e"],"id":1277}],[{"start":{"row":67,"column":4},"end":{"row":67,"column":6},"action":"insert","lines":["()"],"id":1278}],[{"start":{"row":67,"column":0},"end":{"row":68,"column":0},"action":"remove","lines":[".use()",""],"id":1279},{"start":{"row":66,"column":0},"end":{"row":67,"column":0},"action":"insert","lines":[".use()",""]}],[{"start":{"row":66,"column":0},"end":{"row":67,"column":0},"action":"remove","lines":[".use()",""],"id":1280},{"start":{"row":65,"column":0},"end":{"row":66,"column":0},"action":"insert","lines":[".use()",""]}],[{"start":{"row":65,"column":5},"end":{"row":65,"column":21},"action":"insert","lines":["injectParsedBody"],"id":1281}],[{"start":{"row":65,"column":21},"end":{"row":65,"column":23},"action":"insert","lines":["()"],"id":1282}],[{"start":{"row":67,"column":29},"end":{"row":67,"column":30},"action":"insert","lines":[";"],"id":1283}],[{"start":{"row":50,"column":3},"end":{"row":51,"column":0},"action":"insert","lines":["",""],"id":1285}],[{"start":{"row":51,"column":0},"end":{"row":52,"column":0},"action":"insert","lines":["",""],"id":1286}],[{"start":{"row":49,"column":0},"end":{"row":50,"column":0},"action":"remove","lines":["// Response time header",""],"id":1287},{"start":{"row":50,"column":0},"end":{"row":51,"column":0},"action":"insert","lines":["// Response time header",""]}],[{"start":{"row":50,"column":0},"end":{"row":51,"column":0},"action":"remove","lines":["// Response time header",""],"id":1288},{"start":{"row":51,"column":0},"end":{"row":52,"column":0},"action":"insert","lines":["// Response time header",""]}],[{"start":{"row":49,"column":0},"end":{"row":50,"column":0},"action":"insert","lines":["",""],"id":1289}],[{"start":{"row":68,"column":0},"end":{"row":69,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1290},{"start":{"row":67,"column":0},"end":{"row":68,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":67,"column":0},"end":{"row":68,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1291},{"start":{"row":66,"column":0},"end":{"row":67,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":66,"column":0},"end":{"row":67,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1292},{"start":{"row":65,"column":0},"end":{"row":66,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":65,"column":0},"end":{"row":66,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1293},{"start":{"row":64,"column":0},"end":{"row":65,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":64,"column":0},"end":{"row":65,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1294},{"start":{"row":63,"column":0},"end":{"row":64,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":63,"column":0},"end":{"row":64,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1295},{"start":{"row":62,"column":0},"end":{"row":63,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":62,"column":0},"end":{"row":63,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1296},{"start":{"row":61,"column":0},"end":{"row":62,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":61,"column":0},"end":{"row":62,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1297},{"start":{"row":60,"column":0},"end":{"row":61,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":60,"column":0},"end":{"row":61,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1298},{"start":{"row":59,"column":0},"end":{"row":60,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":59,"column":0},"end":{"row":60,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1299},{"start":{"row":58,"column":0},"end":{"row":59,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":58,"column":0},"end":{"row":59,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1300},{"start":{"row":57,"column":0},"end":{"row":58,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":57,"column":0},"end":{"row":58,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1301},{"start":{"row":56,"column":0},"end":{"row":57,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":56,"column":0},"end":{"row":57,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1302},{"start":{"row":55,"column":0},"end":{"row":56,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":55,"column":0},"end":{"row":56,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1303},{"start":{"row":54,"column":0},"end":{"row":55,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":54,"column":0},"end":{"row":55,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1304},{"start":{"row":53,"column":0},"end":{"row":54,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":53,"column":0},"end":{"row":54,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1305},{"start":{"row":52,"column":0},"end":{"row":53,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":52,"column":0},"end":{"row":53,"column":0},"action":"remove","lines":[".use(injectParsedBody())",""],"id":1306},{"start":{"row":51,"column":0},"end":{"row":52,"column":0},"action":"insert","lines":[".use(injectParsedBody())",""]}],[{"start":{"row":49,"column":0},"end":{"row":50,"column":0},"action":"insert","lines":["",""],"id":1307}],[{"start":{"row":50,"column":0},"end":{"row":50,"column":1},"action":"insert","lines":["c"],"id":1308}],[{"start":{"row":50,"column":1},"end":{"row":50,"column":2},"action":"insert","lines":["o"],"id":1309}],[{"start":{"row":50,"column":2},"end":{"row":50,"column":3},"action":"insert","lines":["n"],"id":1310}],[{"start":{"row":50,"column":3},"end":{"row":50,"column":4},"action":"insert","lines":["s"],"id":1311}],[{"start":{"row":50,"column":4},"end":{"row":50,"column":5},"action":"insert","lines":["o"],"id":1312}],[{"start":{"row":50,"column":5},"end":{"row":50,"column":6},"action":"insert","lines":["l"],"id":1313}],[{"start":{"row":50,"column":6},"end":{"row":50,"column":7},"action":"insert","lines":["e"],"id":1314}],[{"start":{"row":50,"column":7},"end":{"row":50,"column":8},"action":"insert","lines":["."],"id":1315}],[{"start":{"row":50,"column":8},"end":{"row":50,"column":9},"action":"insert","lines":["l"],"id":1316}],[{"start":{"row":50,"column":9},"end":{"row":50,"column":10},"action":"insert","lines":["o"],"id":1317}],[{"start":{"row":50,"column":10},"end":{"row":50,"column":11},"action":"insert","lines":["g"],"id":1318}],[{"start":{"row":50,"column":11},"end":{"row":50,"column":13},"action":"insert","lines":["()"],"id":1319}],[{"start":{"row":50,"column":12},"end":{"row":50,"column":13},"action":"insert","lines":["i"],"id":1320}],[{"start":{"row":50,"column":13},"end":{"row":50,"column":14},"action":"insert","lines":["n"],"id":1321}],[{"start":{"row":50,"column":12},"end":{"row":50,"column":14},"action":"remove","lines":["in"],"id":1322},{"start":{"row":50,"column":12},"end":{"row":50,"column":28},"action":"insert","lines":["injectParsedBody"]}],[{"start":{"row":18,"column":4},"end":{"row":18,"column":7},"action":"insert","lines":["// "],"id":1323},{"start":{"row":19,"column":4},"end":{"row":19,"column":7},"action":"insert","lines":["// "]},{"start":{"row":20,"column":4},"end":{"row":20,"column":7},"action":"insert","lines":["// "]}],[{"start":{"row":50,"column":0},"end":{"row":50,"column":3},"action":"insert","lines":["// "],"id":1324}],[{"start":{"row":50,"column":0},"end":{"row":51,"column":0},"action":"remove","lines":["// console.log(injectParsedBody)",""],"id":1325}],[{"start":{"row":14,"column":0},"end":{"row":30,"column":19},"action":"remove","lines":["r.connect(config.rethinkdb, (err, connection) => {","  if (err) throw err;","  ","  chainPromises([","    // deleteDatabase,","    // initializeDatabase,","    // populateDatabase","  ], connection).then(","    () => {","      app.listen(config.webServerPort);","      console.log(`Web server listening on port ${config.webServerPort}`);","    },","    err => console.error(err)","  );","});","","webpackDevServer();"],"id":1326}],[{"start":{"row":14,"column":0},"end":{"row":15,"column":0},"action":"remove","lines":["",""],"id":1327}],[{"start":{"row":14,"column":0},"end":{"row":15,"column":0},"action":"remove","lines":["",""],"id":1328}],[{"start":{"row":53,"column":0},"end":{"row":54,"column":0},"action":"insert","lines":["",""],"id":1329}],[{"start":{"row":54,"column":0},"end":{"row":70,"column":19},"action":"insert","lines":["r.connect(config.rethinkdb, (err, connection) => {","  if (err) throw err;","  ","  chainPromises([","    // deleteDatabase,","    // initializeDatabase,","    // populateDatabase","  ], connection).then(","    () => {","      app.listen(config.webServerPort);","      console.log(`Web server listening on port ${config.webServerPort}`);","    },","    err => console.error(err)","  );","});","","webpackDevServer();"],"id":1330}],[{"start":{"row":17,"column":0},"end":{"row":18,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1331},{"start":{"row":18,"column":0},"end":{"row":19,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":18,"column":0},"end":{"row":19,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1332},{"start":{"row":19,"column":0},"end":{"row":20,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":19,"column":0},"end":{"row":20,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1333},{"start":{"row":20,"column":0},"end":{"row":21,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":20,"column":0},"end":{"row":21,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1334},{"start":{"row":21,"column":0},"end":{"row":22,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":21,"column":0},"end":{"row":22,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1335},{"start":{"row":22,"column":0},"end":{"row":23,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":22,"column":0},"end":{"row":23,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1336},{"start":{"row":23,"column":0},"end":{"row":24,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":23,"column":0},"end":{"row":24,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1337},{"start":{"row":24,"column":0},"end":{"row":25,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":24,"column":0},"end":{"row":25,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1338},{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":23,"column":0},"end":{"row":24,"column":0},"action":"remove","lines":["let n = 0;",""],"id":1339},{"start":{"row":24,"column":0},"end":{"row":25,"column":0},"action":"insert","lines":["let n = 0;",""]}],[{"start":{"row":24,"column":0},"end":{"row":25,"column":0},"action":"remove","lines":["let n = 0;",""],"id":1340},{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"insert","lines":["let n = 0;",""]}],[{"start":{"row":24,"column":0},"end":{"row":25,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1341},{"start":{"row":23,"column":0},"end":{"row":24,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":23,"column":0},"end":{"row":24,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1342},{"start":{"row":24,"column":0},"end":{"row":25,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":24,"column":0},"end":{"row":25,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1343},{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1344},{"start":{"row":26,"column":0},"end":{"row":27,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":26,"column":0},"end":{"row":27,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1345},{"start":{"row":27,"column":0},"end":{"row":28,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":27,"column":0},"end":{"row":28,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1346},{"start":{"row":28,"column":0},"end":{"row":29,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":28,"column":0},"end":{"row":29,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1347},{"start":{"row":29,"column":0},"end":{"row":30,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":29,"column":0},"end":{"row":30,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1348},{"start":{"row":30,"column":0},"end":{"row":31,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":30,"column":0},"end":{"row":31,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1349},{"start":{"row":31,"column":0},"end":{"row":32,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":31,"column":0},"end":{"row":32,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1350},{"start":{"row":32,"column":0},"end":{"row":33,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":32,"column":0},"end":{"row":33,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1351},{"start":{"row":33,"column":0},"end":{"row":34,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":33,"column":0},"end":{"row":34,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1352},{"start":{"row":32,"column":0},"end":{"row":33,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":32,"column":0},"end":{"row":33,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1353},{"start":{"row":31,"column":0},"end":{"row":32,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":31,"column":0},"end":{"row":32,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1354},{"start":{"row":30,"column":0},"end":{"row":31,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":30,"column":0},"end":{"row":31,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1355},{"start":{"row":29,"column":0},"end":{"row":30,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":29,"column":0},"end":{"row":30,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1356},{"start":{"row":28,"column":0},"end":{"row":29,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":28,"column":0},"end":{"row":29,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1357},{"start":{"row":27,"column":0},"end":{"row":28,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":27,"column":0},"end":{"row":28,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1358},{"start":{"row":26,"column":0},"end":{"row":27,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":26,"column":0},"end":{"row":27,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1359},{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1360},{"start":{"row":24,"column":0},"end":{"row":25,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":24,"column":0},"end":{"row":25,"column":0},"action":"remove","lines":["registerAPI(router);",""],"id":1361},{"start":{"row":23,"column":0},"end":{"row":24,"column":0},"action":"insert","lines":["registerAPI(router);",""]}],[{"start":{"row":3,"column":30},"end":{"row":3,"column":45},"action":"remove","lines":["koa-body-parser"],"id":1366},{"start":{"row":3,"column":30},"end":{"row":3,"column":44},"action":"insert","lines":["koa-bodyparser"]}],[{"start":{"row":43,"column":9},"end":{"row":43,"column":10},"action":"insert","lines":["t"],"id":1367}],[{"start":{"row":43,"column":10},"end":{"row":43,"column":11},"action":"insert","lines":["t"],"id":1368}],[{"start":{"row":43,"column":10},"end":{"row":43,"column":11},"action":"remove","lines":["t"],"id":1369}],[{"start":{"row":43,"column":9},"end":{"row":43,"column":10},"action":"remove","lines":["t"],"id":1370}]]},"ace":{"folds":[],"scrolltop":177.5,"scrollleft":0,"selection":{"start":{"row":44,"column":6},"end":{"row":44,"column":6},"isBackwards":false},"options":{"tabSize":2,"useSoftTabs":true,"guessTabSize":false,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":6,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1447985566076}