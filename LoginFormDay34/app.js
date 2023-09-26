const express = require('express');
const app = express();
const session = require('express-session');
const cookie =require('cookie-parser');
const bcrypt = require('bcrypt');
const validator= require('validator');
const { render } = require('ejs');
app.use(cookie());
app.set('view engine','ejs')
app.use(session({
    secret: 'ABCD123',
    resave :false,
    saveUninitialized:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/login', (req,res)=>{
    const { username ,password}= req.body;
    const safeusername= validator.escape(username);
    if(safeusername==='admin' && password==='password'){
        const safepassword = validator.escape(password);
        const hashedpassword = bcrypt.hashSync(safepassword , 10);
        req.session.username = safeusername;
        res.cookie('username',res.session.username);
        console.log(res.session.username)
        res.render('profile',{username:safeusername,hashedpassword:hashedpassword,safepassword:safepassword})
    }
    else{
         res.redirect('index');
    }
})
// app.get('/login',(req,res)=>{
//     if(!req.cookie.username){
//         render('index');
//     }
//     else{
//       console.log('you are already logged in')  
//     }
// })
app.listen(3000,()=>console.log('server running on port 3000'))