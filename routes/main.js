const express = require('express')
const MainRouter = express.Router()
const UserModel = require('../models/User')
const DB_CONNECTION = require('../db/config')
const { QueryTypes } = require('sequelize/dist')

MainRouter.get('/home', (req, res)=>{
    res.render('home')
})

MainRouter.get('/search/:search?', (req, res)=>{
    let search = req.params.search

    if(search != undefined)
    {
        search = search.split(' ')

        let query = 'SELECT username,firstname,lastname FROM users WHERE '
        
        let wordCounter = 1
        search.forEach(word => {
            query += "username LIKE '%"+word+"%' "
            query += "OR firstname LIKE '%"+word+"%' "
            query += "OR lastname LIKE '%"+word+"%' "

            if(wordCounter < search.length)
                query += 'OR '
            wordCounter += 1
        })

        DB_CONNECTION.query(query, {raw:true, type:QueryTypes.SELECT}).then(users=>{

            res.render('search',{search:true, users:users})
        }).catch(error=>{
            throw error
        })
    }
    else
    {
        let logged = false
        let userLogged = req.session.UserInfo
        if(req.session.UserInfo)
            logged = true

        res.render('search', {search:search, logged:logged, userData: userLogged})
    }
})

MainRouter.post('/search', (req, res)=>{
    const search = req.body.search
    res.redirect('/search/'+search)
})

module.exports = MainRouter