const axios = require('axios');
const moment = require('moment');
const { createOrUpdateBlog } = require('./Models/blogs')
const getposts =async (req,res,next)=>{
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const posts = response.data;
    posts.forEach(element => {
        element.date =moment().format('YYYY-MM-DD HH:mm:ss');
    });
    res.render('index',{blogs:posts})
}
const addpost = async (req,res,next)=>{
    const data = req.body
    data.date = moment().format('YYYY-MM-DD HH:mm:ss');
    data.image = "blog-post-thumb-2.jpg";
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts',data);
    const post =response.data
    createOrUpdateBlog(post);
    next();
}
module.exports={
    getposts,
    addpost
} ;