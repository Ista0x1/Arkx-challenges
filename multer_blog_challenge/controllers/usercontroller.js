const  express = require('express'); 
const session = require('express-session');
const app = express();
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
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
app.use(passport.initialize());
app.use(passport.session());
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

router.get('/login',(req,res)=>{
    res.render('login');
})
router.post('/register',async (req,res)=>{
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
    res.redirect('/')
})
router.post('/login', (req, res, next) => {
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



router.get('/register',(req,res)=>{
    res.render('register',{error:''});
})
module.exports = router;