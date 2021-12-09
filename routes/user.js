const express = require('express')
const UserModel = require('../models/User')

const UserRouter = express.Router()

// Get Users
UserRouter.get('/user/:username', (req, res)=>{
    const username = req.params.username

    UserModel.findOne({
        where:{
            username:username
        }
    }).then((user)=>{
        if(user != null)
        {
            console.log('User Founded')
            res.render('profile', {user: user})
        }
        else
        {
            res.send('<h1>User Not Founded</h1>')
        }
    }).catch((error)=>{
        if(error)
            throw error

        res.send('<h1>User Not Founded</h1>')
    })
})

module.exports = UserRouter