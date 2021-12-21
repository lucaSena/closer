const express = require('express')
const UserModel = require('../models/User')

const UserRouter = express.Router()

// Get Users
UserRouter.get('/user/:username', (req, res) => {
    const username = req.params.username

    UserModel.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        if (user != null) {
            console.log('User Founded')
            res.render('profile', { user: user, followers: 3, follower_id: req.session.UserInfo.id })
        } else {
            res.send('<h1>User Not Founded</h1>')
        }
    }).catch((error) => {
        if (error)
            throw error

        res.send('<h1>User Not Founded</h1>')
    })
})
UserRouter.post('/profile', (req, res) => {
    const followed = req.body.followed
    const follower = req.body.follower
    var username = req.body.username
    FollowModel.create({
        followed_id: followed,
        follower_id: follower
    }).then(() => {
        console.log('Inserido no banco de dados')
        res.redirect('/user/' + username)
    }).catch((error) => {
        if (error)
            throw error

        console.log('DEU MERDA')
        res.redirect('/')
    })
})
module.exports = UserRouter