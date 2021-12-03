const express = require('express')
const CommentModel = require('../models/Comment')

const CommentRouter = express.Router()

CommentRouter.get('/comment', (req, res)=>{
    res.render('comment')
})
CommentRouter.post('/comment', (req, res)=>{
    const description = req.body.description
    const post_date = req.body.post_date
    const photo_id  = req.body.photo_id

    console.log(date)

    if(description && post_date && photo_id)
    {
        UserModel.create({
            description: description,
            post_date: post_date,
            photo_id: photo_id
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

module.exports = CommentRouter