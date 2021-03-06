const express = require('express')
const app = express()

// Session
const session = require('express-session')

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: false,

    cookie: {
        maxAge: 24 * 60 * 60 * 10000
    }  
}))

// Database
const connection = require('./db/config')

// Models
const UserModel = require('./models/User')
const PhotoModel = require('./models/Photo')
const CommentModel = require('./models/Comment')

// Routes
const MainRouter = require('./routes/main')
const LoginRouter = require('./routes/login')
const UserRouter = require('./routes/user')
const PhotoRouter = require('./routes/photo')
const CommentRouter = require('./routes/comment')

// Config
app.set('view engine','ejs');
app.use(express.static('public')); // Static Files Folder

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Using Routes
app.use('/', MainRouter)
app.use('/', LoginRouter)
app.use('/', UserRouter)
app.use('/', PhotoRouter)
app.use('/', CommentRouter)

// Main Route
app.get('/', (req, res)=>{
    res.render('welcome', {title: 'Main Title'});
})

// Run Server
app.listen(3000, (error)=>{
    if(error)
        throw error
    console.log('Server is running...')
})