const express = require('express')
const UserModel = require('../models/User')

const LoginRouter = express.Router()

// Sign In Routes
LoginRouter.get('/signin', (req, res)=>{
    res.render('signin')
})

LoginRouter.post('/signin', (req, res)=>{
    res.send('<h1>Ola</h1>')
})

// Sign Up Routes
LoginRouter.get('/signup', (req, res)=>{
    res.render('signup')
})

LoginRouter.post('/signup', (req, res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const genre = req.body.genre
    const description = req.body.description
    const date = req.body.date

    console.log(date)

    if(username && email && password && genre && description && date)
    {
        UserModel.create({
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