const  express = require('express'); 
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const blogcontroller = require('./controllers/blogcontroller');
const usercontroller =require('./controllers/usercontroller');
const users= []
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

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');
app.use(usercontroller)
app.use(blogcontroller);
app.listen(3000,() => console.log('server running at port 3000'))