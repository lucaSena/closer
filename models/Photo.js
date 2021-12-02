const {Sequelize, Op} = require('sequelize')
const sequelize = require('sequelize')

const connection = require('../db/config')

const Photo = connection.define('photo', {
    description:{
        type: Sequelize.STRING(150),
        allowNull: true
    },
    visibility:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    post_date:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    show_likes:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    poster_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Photo.sync({force: false})
    .then(()=>{
        console.log('[DATABASE SUCESS] Photo Table Used')
    })
    .catch((error)=>{
        if(error)
            throw error
    
        console.log('[DATABASE ERROR] Photo Table Not Used')
    })

    module.exports = Photo