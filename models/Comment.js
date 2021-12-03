const {Sequelize, Op} = require('sequelize')
const sequelize = require('sequelize')


const connection = require('../db/config')

const Comment = connection.define('comment', {
    description:{
        type: Sequelize.STRING(1000),
        allowNull: false
    },
    post_date:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    photo_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Comment.sync({force: false})
    .then(()=>{
        console.log('[DATABASE SUCESS] comment Table Used')
    })
    .catch((error)=>{
        if(error)
            throw error

        console.log('[DATABASE ERROR] comment Table Not Used')
    })

module.exports = Comment