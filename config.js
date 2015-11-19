export default {
  publicIp: '52.25.236.126',
  webServerPort: 9090,
  APIport: 8181,
  WDSPort: 3000,
  websocketsPort: 8282,
  googleMapsKey: 'AIzaSyDKxSKwUSRKyqfGn1kjNRLmOwjF7_5BWgQ', // :o !
  rethinkdb: {
    host: 'localhost',
    port: 28015,
    db: 'Oso_dev',
    timeout: 5,
  },
  database: {
    tables: ['users'],
  }
  // "appPublicDomain": "http://dev.osoapp.com",
  // "apiPublicDomain": "http://api.dev.osoapp.com",
  // "wdsPublicDomain": "http://wds.dev.osoapp.com"
};
