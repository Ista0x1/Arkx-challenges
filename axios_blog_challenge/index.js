const  express = require('express'); 
const session = require('express-session');
const passport = require('passport-local');
const LocalStrategy = require('passport-local');
const fs = require('fs')
const app = express();
const blogcontroller = require('./controllers/blogcontroller')
const axiosapi= require('./axios');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');

app.use(blogcontroller);
app.listen(3000,() => console.log('server running at port 3000'))