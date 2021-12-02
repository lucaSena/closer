const express = require('express')
const app = express()

// Database
const connection = require('./db/config')

// Models
const UserModel = require('./models/User')
const PhotoModel = require('./models/Photo')

// Config
app.set('view engine','ejs');
app.use(express.static('public')); // Static Files Folder

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Routes
const LoginRouter = require('./routes/login')

// Using Routes
app.use('/', LoginRouter)

// Main Route
app.get('/', (req, res)=>{
    res.render('login', {title: 'Main Title'});
})

app.get('/photos',(req, res)=>{
    res.render('test')
});
app.post('/image',(req, res)=>{
   // console.log(req.body)
    const description = req.body.description
    const visibility = req.body.visibility == "1"
    const show_likes = req.body.show_likes == "1"
    const url_image = req.body.url_image
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
// Run Server
app.listen(3000, (error)=>{
    if(error)
        throw error
    console.log('Server is running...')
})