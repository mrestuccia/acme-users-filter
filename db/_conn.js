const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL)
module.exports = _conn;