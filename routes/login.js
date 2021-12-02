const express = require('express')
const UserModel = require('../models/User')

const LoginRouter = express.Router()

// Signin Route
LoginRouter.post('/signin', (req, res)=>{
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