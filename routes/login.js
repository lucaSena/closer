const express = require('express')

const LoginRouter = express.Router()

// Signin Route
LoginRouter.post('/signin', (req, res)=>{
    console.log(req.body)
    
    res.redirect('/')
})

module.exports = LoginRouter