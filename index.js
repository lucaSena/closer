const express = require('express')
const app = express()

// Database
const connection = require('./db/config')

// Models
const UserModel = require('./models/User')
const PhotoModel = require('./models/Photo')

// Routes
const LoginRouter = require('./routes/login')
const UserRouter = require('./routes/user')
const PhotoRouter = require('./routes/photo')

// Config
app.set('view engine','ejs');
app.use(express.static('public')); // Static Files Folder

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Using Routes
app.use('/', LoginRouter)
app.use('/', UserRouter)
app.use('/', PhotoRouter)

// Main Route
app.get('/', (req, res)=>{
    res.render('login', {title: 'Main Title'});
})

// Run Server
app.listen(3000, (error)=>{
    if(error)
        throw error
    console.log('Server is running...')
})