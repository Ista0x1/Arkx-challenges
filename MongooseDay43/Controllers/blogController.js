const  express = require('express'); 
const path = require('path');
const multer =require('multer');
const i18next = require('i18next');
const app = express();
const Blog= require('../models/mongooseModel');
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
    const blogs = await Blog.find();
    const categories = await Blog
   res.render('index',{blogs:blogs,tr:enhome})
})
router.get('/ar',async (req,res)=>{
    const blogs = await Blog.find();
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
    const newblog = new Blog(data);
   newblog.save();
    res.redirect('/')
})
router.post('/update', upload.single('image'), async (req, res) => {
    const { id, title, content } = req.body;
    console.log(id);
    const idint = parseInt(id);
    console.log(id)
    if (isNaN(id)) {
        return res.status(400).send("Invalid ID provided");
    }

    let imageFilename = req.file ? req.file.filename : undefined;
    const data = {
        title: title,
        content: content,
    };
    
    if (imageFilename) {
        data.image = imageFilename;
    }
    console.log(data);
    console.log(imageFilename);
    try {
       const result =  await Blog.updateOne({id:idint}, data);
     //  console.log(result);
       res.redirect('/');
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.get('/blog/:id',async (req,res)=>{
    const id = parseInt(req.params.id);
   const blog= await Blog.findOne({id:id});
   res.render('blog',{blog:blog})
})
router.get('/blog/update/:id',async (req,res)=>{
   
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send("Invalid ID");
    }
    console.log(id);
    console.log('updated id is :'+ id);
    const blog = await Blog.findOne({id:id});
    res.render('createblog',{blog:blog})
})
router.post('/blog/delete', async(req,res)=>{
    const id = req.body.id;
    console.log(id)
    const deletedblog = await Blog.deleteOne({id:id})
     res.redirect('/');
})
router.get('/category/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const blogs = await Blog.find({ categories: category });
        res.render('index', { blogs: blogs, tr: enhome }); 
    } catch (error) {
        console.error("Error fetching blogs by category:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/search', async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const blogs = await Blog.find({ $text: { $search: searchTerm } });
        res.render('index', { blogs: blogs, tr: enhome }); 
    } catch (error) {
        console.error("Error searching blogs:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;