const express = require('express')
const MainRouter = express.Router()

MainRouter.get('/home', (req, res)=>{
    res.render('home')
})

module.exports = MainRouter