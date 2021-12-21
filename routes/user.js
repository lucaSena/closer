const express = require('express')
const UserModel = require('../models/User')
const FollowModel = require('../models/Follow')

const UserRouter = express.Router()

// Get Users
UserRouter.get('/user/:username', (req, res) => {
    const username = req.params.username

    // Id do Usuário Logado - Caso não esteja logado, não há como seguir
    let current_id = -1
    if(req.session.UserInfo)
        current_id = req.session.UserInfo.id

    UserModel.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        if (user != null) {
            console.log('User Founded'+user.id)
            res.render('profile', { user: user, followers: 3, follower_id: current_id })
        } else {
            res.send('<h1>User Not Founded</h1>')
        }
    }).catch((error) => {
        if (error)
            throw error

        res.send('<h1>User Not Founded</h1>')
    })
})
UserRouter.post('/follow', (req, res) => {
    const followed = req.body.followed
    const follower = req.body.follower
    const username = req.body.username

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