const  express = require('express'); 
const path = require('path');
const multer =require('multer');
const i18next = require('i18next');
const app = express();
const { blogdb,createOrUpdateBlog ,deleteblog }= require('../Models/blogs');
const router = express.Router();
i18next.init({
    lng: 'en',
    debug: true,
    returnObjects: true,
    resources: {
      en: {
        translation: {
          "home":{
          "language":"Select language",
          "greeting": "hello world",
          "hometitle" : "DevBlog - all you need about web development",
          "readmorebtn" : "Read More",
          "comment" : "comments",
          "createbtn" : "Create"
            }
        }
    },
        ar:{
            translation: {
                "home":{
                "language":"إختر اللغة",
                "greeting": "صباح الخير",
                "hometitle" : "مقالات في البرمجة - كل متحتاجه في عالم البرمجة",
                "readmorebtn" : "قراءة المزيد",
                "comment" : "تعليق",
                "createbtn" : "إنشاء"
                }
            }
        }
      
    }
  });
const arhome = i18next.t('home',{lng:'ar'});
const enhome =i18next.t('home',{ lng: 'en'})
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/assets/images/blog');
    },
    filename: (req,file,cb)=>{
        console.log(file);
        cb(null,file.fieldname+'-'+ Date.now()+path.extname(file.originalname));
    }
})
const upload = multer({storage : storage})
router.get('/',async (req,res)=>{
    const blogs = await blogdb();

    res.render('index',{blogs:blogs,tr:enhome})
})
router.get('/ar',async (req,res)=>{
    const blogs = await blogdb();
    res.render('index',{blogs:blogs,tr:arhome})
})
router.get('/create',(req,res)=>{
    res.render('createblog',{blog : false});
})

router.post('/create',upload.single('image'),(req,res)=>{
    const { title ,content } =req.body;
    const data = {
        id: Date.now(),
        title: title,
        content: content,
        image: req.file.filename
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