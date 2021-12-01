const express = require('express')
const app = express()

// Config
app.set('view engine','ejs');
app.use(express.static('public')); // Static Files Folder

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Main Route
app.get('/', (req, res)=>{
    res.render('main', {title: 'Main Title'});
})

// Run Server
app.listen(3000, (error)=>{
    if(error)
        throw error
    console.log('Server is running...')
})