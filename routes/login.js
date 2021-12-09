const express = require('express')
const UserModel = require('../models/User')

const LoginRouter = express.Router()

// Sign In Routes
LoginRouter.get('/signin', (req, res)=>{
    res.render('signin')
})

LoginRouter.post('/signin', (req, res)=>{
    const email = req.body.email
    const password = req.body.password

    UserModel.

    req.session.userInfo = {
        id: 1,
        email: 'pessoa',
        username: 'alguma coisa'
    }

    res.json(req.session.userInfo)
})

// Sign Up Routes
LoginRouter.get('/signup', (req, res)=>{
    res.render('signup')
})

LoginRouter.post('/signup', (req, res)=>{
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const genre = req.body.genre
    const description = req.body.description
    const date = req.body.date

    console.log(date)

    if(firstname && lastname && username && email && password && genre && description && date)
    {
        UserModel.create({
            lastname: lastname,
            firstname: firstname,
            username: username,
            email: email,
            password: password,
            genre: genre,
            description: description,
            birth_date: date
        }).then(()=>{
            console.log('Inserido no banco de dados')
            res.redirect('/')
        }).catch((error)=>{
            if(error)
                throw error

            console.log('DEU MERDA')
            res.redirect('/')
        })
    }
    else
    {
        console.log('Existem Campos Vazios')
        res.redirect('/')
    }
})

module.exports = LoginRouter