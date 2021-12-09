
const {Sequelize, Op} = require('sequelize')
const sequelize = require('sequelize')

const connection = require('../db/config')

const User = connection.define('user', {
    firstname:{
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname:{
        type: Sequelize.STRING,
        allowNull: false
    }
    ,
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING(400),
        allowNull: true
    },
    birth_date:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    genre:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync({force: false})
    .then(()=>{
        console.log('[DATABASE SUCCESS] User Table Used!')
    })
    .catch((error)=>{
        if(error)
            throw error

        console.log('[DATABASE ERROR] User Table Not Used')
    })

module.exports = User