const {Sequelize, Op} = require('sequelize')
const sequelize = require('sequelize')


const connection = require('../db/config')

const Follow = connection.define('follow', {
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    follower:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Follow.sync({force: false})
then(()=>{
    console.log('[DATABASE SUCESS] comment Table Used')
})
.catch((error)=>{
    if(error)
        throw error

    console.log('[DATABASE ERROR] comment Table Not Used')
})

module.exports = Follow