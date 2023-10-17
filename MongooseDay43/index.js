const  express = require('express');
const mongoose =require('mongoose');
const Blog = require('./models/mongooseModel');
const blogcontroller = require('./Controllers/blogController');
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/blogs')
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');
app.use(blogcontroller);
app.listen(3000,()=>{console.log('server running on 3000')})