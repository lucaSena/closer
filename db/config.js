const sequelize = require('sequelize')

require('dotenv').config()

const connection = new sequelize(process.env.DB_NAME, process.env.USERNAME, process.env.PASSWORD,{
    host:process.env.HOST,
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection