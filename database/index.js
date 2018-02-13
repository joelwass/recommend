const Sequelize = require('sequelize')
const User = require('./models/user')
// const Recommendation = require('./models/recommendation')
const config = require('../config')

const {
  host,
  username,
  password,
  database
} = config.database

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  pool: { max: 5, min: 0, idle: 10000 }
})

module.exports = {
  User: User(sequelize)
}
