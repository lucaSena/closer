const express = require('express')
const PhotoModel = require('../models/Photo')

const PhotoRouter = express.Router()
const PhotoMiddleware = require('../middlewares/photo_upload')
const ResizeClass = require('../class/Resize')

const path = require('path')

// Upload Photo Form
PhotoRouter.get('/photos',(req, res)=>{
    res.render('new_image')
});

// Upload Photo Action
PhotoRouter.post('/image', PhotoMiddleware.single('image'), async (req, res)=>{
    const imagePath = path.join(__dirname, '../public/image');
    const fileUpload = new ResizeClass(imagePath);

    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }
    
    const filename = await fileUpload.save(req.file.buffer);

    const description = req.body.description
    const visibility = req.body.visibility == "1"
    const show_likes = req.body.show_likes == "1"
    const url_image = filename
    const user_id = 23
    const post_date = "1999-02-02"

    PhotoModel.create({
        description: description,
        visibility: visibility,
        show_likes: show_likes,
        image_url: url_image,
        author_id: user_id,
        post_date: post_date
    }).then(()=>{
        console.log('Inserido no banco de dados')
        res.redirect('/')
    }).catch((error)=>{
        if(error)
            throw error
        
        console.log('DEU MERDA')
        res.redirect('/')
    })
 })
 
PhotoRouter.get('/image/:id', (req, res)=>{
    const id = req.params.id

    PhotoModel.findOne({
        where:{
            id:id
        }
    }).then((image)=>{
        if(image != null)
        {
            res.render('image', {img_url: image['image_url']})
        }
        else
        {
            res.send('<h1>Image not founded</h1>')
        }
    }).catch((error)=>{
        if(error)
            throw error
        console.log('Image Id Has Errors')
    })
})

module.exports = PhotoRouter