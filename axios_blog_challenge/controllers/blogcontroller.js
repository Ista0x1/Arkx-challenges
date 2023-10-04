const  express = require('express'); 
const { blogdb,createOrUpdateBlog ,deleteblog }= require('../Models/blogs');
const {getposts ,addpost} = require('../axios');
const router = express.Router();
router.get('/',getposts)

router.get('/create',(req,res)=>{
    res.render('createblog',{blog : false});
})
router.post('/create',addpost,(req,res)=>{res.redirect('/')})
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