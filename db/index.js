const _conn = require('./_conn');

const sync = ()=> {
  return _conn.sync();
}

module.exports = {
  sync
}