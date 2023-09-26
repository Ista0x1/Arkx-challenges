const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const SECRET_KEY = 'ABCD123'; 

const saltRounds = 10;
const demoHashedPassword = bcrypt.hashSync('password123', saltRounds);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.set('view engine', 'ejs');
app.use(csurf({ cookie: true }));

app.get('/', (req, res) => {
    res.render('index', { csrfToken: req.csrfToken() });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && bcrypt.compareSync(password, demoHashedPassword)) {
        const token = jwt.sign({ sub: username }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token);
        res.redirect('/dashboard');
    } else {
        res.redirect('/');
    }
});

app.get('/dashboard', (req, res) => {
    const token = req.cookies.token;
    
    try {
        jwt.verify(token, SECRET_KEY);
        res.render('dashboard');
    } catch (err) {
        res.redirect('/');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
