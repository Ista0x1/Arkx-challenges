const  express = require('express'); 
const fs = require('fs')
const app = express();
app.use(express.static('public'));

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
module.exports ={
blogdb,
createOrUpdateBlog,
deleteblog
}