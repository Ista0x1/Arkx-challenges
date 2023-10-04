const express = require('express');
const app = express();
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const session = require('express-session');
const validator = require('validator')
const users=[];
const messages= [{
    error:'',
    succes:''
}]
app.use(session({
    secret: 'ABCD123',
    saveUninitialized:false,
    resave:false
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = users.find(u => u.email === email); 
    console.log("Found user:", user);

    if (user && await bcrypt.compare(password, user.password)) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'Incorrect email or password.' });
    }
}));

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    const user = users.find(u=>u.id ==id);
    console.log("Deserializing user: ", user);

        done(null,user);
})
app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/login',(req,res)=>{
    res.render('login');
    console.log(users)
})
app.post('/register',async (req,res)=>{
    const { name,email,password }= req.body;
    if(validator.isEmpty(name) || !validator.isLength(password,{ min:6 , max:10}) || !validator.isEmail(email)){
        
        messages.error = 'please enter valid inputs' 
       res.render('register',{error : messages.error})
    }
    const hashedpassword = await bcrypt.hash(password,10);
     users.push({
        id: Date.now().toString(),
        name: validator.escape(name),
        email: email,
        password: hashedpassword
     })   
    res.render('profile',{user: users[users.length -1]})
})
app.post('/login', (req, res, next) => {
    console.log("Incoming login request:", req.body);

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);  // Handle error from passport
        }
        if (!user) {
            console.log('there is no such a user')
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            console.log(req.session);
            if (err) {
                return next(err);  // Handle error from login process
            }
            

            // Successfully logged in, redirect to the profile page
            return res.render('profile',{user:user});
        });
    })(req, res, next);
});
app.get('/profile', (req, res) => {
    console.log('Checking isAuthenticated:', req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.render('profile', { user: req.user });
    } else {
        res.redirect('/login');
    }
});


app.get('/register',(req,res)=>{
    res.render('register',{error:''});
})
app.listen(3000,()=> console.log('server running at 3000'))