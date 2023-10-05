const  express = require('express'); 
const app = express();
const blogcontroller = require('./controllers/blogcontroller')
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');
app.use(blogcontroller);
app.listen(3000,() => console.log('server running at port 3000'))