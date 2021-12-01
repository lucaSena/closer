const express = require('express')
const app = express()

// Database
const connection = require('./db/config')

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

// Run Server
app.listen(3000, (error)=>{
    if(error)
        throw error
    console.log('Server is running...')
})