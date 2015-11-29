import r from 'rethinkdb';

export function openConnection(params) {
  return r.connect(params);
}

export function closeConnection(conn) {
  return conn.close();
}
