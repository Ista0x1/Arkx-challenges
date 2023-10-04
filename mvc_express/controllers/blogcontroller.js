const  express = require('express'); 
const session = require('express-session');
const passport = require('passport-local');
const LocalStrategy = require('passport-local');
const app = express();
const { blogdb,createOrUpdateBlog ,deleteblog }= require('../Models/blogs');
const router = express.Router();
router.get('/',async (req,res)=>{
    const blogs = await blogdb();
    res.render('index',{blogs:blogs})
})
router.get('/create',(req,res)=>{
    res.render('createblog',{blog : false});
})

router.post('/create',(req,res)=>{
    const { title ,content } =req.body;
    const data = {
        id: Date.now(),
        title: title,
        content: content,
        image: "blog-post-thumb-2.jpg"
    }
    createOrUpdateBlog(data);
   
    res.redirect('/')
})
router.post('/update',(req,res)=>{
    const {id,title,content}= req.body;
    const data = {
        id: parseInt(id),
        title: title,
        content: content,
        image: "blog-post-thumb-2.jpg"
    };
    createOrUpdateBlog(data,id);
     res.redirect('/');
})
router.get('/blog/:id',(req,res)=>{
    const id = parseInt(req.params.id);
   const blog= blogdb(id);
   res.render('blog',{blog:blog})
})
router.get('/blog/update/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const blog = blogdb(id);
    res.render('createblog',{blog:blog})
})
router.post('/blog/delete',(req,res)=>{
    const id = req.body.id;
    console.log(id)
    deleteblog(id);
     res.redirect('/');
})
module.exports = router;