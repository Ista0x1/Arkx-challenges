const  express = require('express'); 
const session = require('express-session');
const passport = require('passport-local');
const LocalStrategy = require('passport-local');
const fs = require('fs')
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');

app.get('/',async (req,res)=>{
    const blogs = await blogdb();
    res.render('index',{blogs:blogs})
    

})
app.get('/create',(req,res)=>{
    res.render('createblog',{blog : false});
})
const blogdb = (id=0) => {
    let jsonData = null;
    try {
        const data = fs.readFileSync('blogs.json', 'utf8');
        jsonData = JSON.parse(data);
        if(id==0) return jsonData;
        else {
            const blog = jsonData.find(b=> b.id===id);
            return blog;
        }
    } catch (err) {
        console.error('Error reading or parsing the file:', err);
    }
}
const createOrUpdateBlog = (data, id = 0) => {
    // Read existing blogs from the JSON file
    let blogs = [];

    if (fs.existsSync('blogs.json')) {
        const rawData = fs.readFileSync('blogs.json', 'utf8');
        blogs = JSON.parse(rawData);
    }

    if (id === 0) {
        // This is a new blog entry
        // Ensure your data has a unique id before pushing to blogs
        blogs.push(data);
    } else {
        // Find the blog with the specified id and update it
        const blogIndex = blogs.findIndex(b => b.id == id);

        if (blogIndex !== -1) {  
            // Update the blog entry
            blogs[blogIndex] = { ...blogs[blogIndex], ...data }; 
        } else {
            // Blog with specified id not found. You can handle this scenario accordingly.
            console.log(`Blog with id ${id} not found.`);
        }
    }

    // Write the updated blogs back to the JSON file
    fs.writeFileSync('blogs.json', JSON.stringify(blogs, null, 2));
};

const deleteblog = (id) =>{
    try {
        let jsonData = []
        const data = fs.readFileSync('blogs.json', 'utf8');
        jsonData = JSON.parse(data);
        
            const blog = jsonData.findIndex(b=> b.id==id);
            console.log(blog);
            jsonData.splice(blog,1);
            console.log(jsonData);
            fs.writeFileSync('blogs.json', JSON.stringify(jsonData, null, 2));
            return blog;
        
    } catch (err) {
        console.error('Error reading or parsing the file:', err);
    }
}
app.post('/create',(req,res)=>{
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
app.post('/update',(req,res)=>{
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
app.get('/blog/:id',(req,res)=>{
    const id = parseInt(req.params.id);
   const blog= blogdb(id);
   res.render('blog',{blog:blog})
})
app.get('/blog/update/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const blog = blogdb(id);
    res.render('createblog',{blog:blog})
})
app.post('/blog/delete',(req,res)=>{
    const id = req.body.id;
    console.log(id)
    deleteblog(id);
     res.redirect('/');
})
app.listen(3000,() => console.log('server running at port 3000'))