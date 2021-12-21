const express = require('express')
const UserModel = require('../models/User')

const LoginRouter = express.Router()

// Middlewares
const MiddleUser = require('../middlewares/user')

// Sign Out
LoginRouter.get('/signout', (req, res) => {
    delete req.session.UserInfo
    res.redirect('/')
})

// Sign In Routes
LoginRouter.get('/signin', MiddleUser.notLogged, (req, res) => {
    let message = false
    if (req.session.ErrorMessage) {
        message = req.session.ErrorMessage

        // Deleta a sessão para que o erro não permaneça
        delete req.session.ErrorMessage
    }

    res.render('signin', { message: message })
})

LoginRouter.post('/signin', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    console.log(email, password)

    UserModel.findOne({
        // Buscar um usuário que possua esse email e essa senha
        where: {
            email: email,
            password: password
        }
    }).then((user) => {
        if (user) {
            // Retorno do usuário que foi descoberto
            req.session.UserInfo = {
                id: user.id,
                email: user.email,
                username: user.username
            }

            // Exibir todos os dados que são retornados
            console.log(user)

            // Redireciona para rota 'home'
            res.redirect('/home')
        } else {
            // Mensagem de Error(Não encontrou o usuário)
            req.session.ErrorMessage = 'O Login Ta errado'

            // Volta para a rota de signin
            res.redirect('/signin')
        }
    }).catch((error) => {
        throw error
        res.redirect('/')
    })
})

// Sign Up Routes
LoginRouter.get('/signup', (req, res) => {
    res.render('signup')
})

LoginRouter.post('/signup', (req, res) => {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const gender = req.body.gender
    const description = req.body.description
    const date = req.body.date

    console.log(firstname, lastname, username, email, password, gender, description, date)

    if (firstname && lastname && username && email && password && gender && description && date) {
        UserModel.create({
            lastname: lastname,
            firstname: firstname,
            username: username,
            email: email,
            password: password,
            gender: gender,
            description: description,
            birth_date: date
        }).then(() => {
            console.log('Inserido no banco de dados')
            res.redirect('/')
        }).catch((error) => {
            if (error)
                throw error

            console.log('DEU MERDA')
            res.redirect('/')
        })
    } else {
        console.log('Existem Campos Vazios')
        res.redirect('/')
    }
})

module.exports = LoginRouter