const { Sequelize, Op } = require('sequelize')
const sequelize = require('sequelize')


const connection = require('../db/config')

const Follow = connection.define('follow', {
    followed_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    follower_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Follow.sync({ force: false })
then(() => {
        console.log('[DATABASE SUCESS] comment Table Used')
    })
    .catch((error) => {
        if (error)
            throw error

        console.log('[DATABASE ERROR] comment Table Not Used')
    })

module.exports = Follow