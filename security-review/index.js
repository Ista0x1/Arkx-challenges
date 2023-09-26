const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const csurf = require('csurf');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'ABCD123', resave: true, saveUninitialized: true }));
app.use(csurf());
const password = 'password';
const hachedpass = bcrypt.hashSync(password,10);
// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Sample Vulnerable Node.js Application');
});

app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
    <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Authenticate user (vulnerable code for the challenge)
  const saveusername = encodeHTML(username);
  if (saveusername === 'admin' && bcrypt.compareSync(password,hachedpass)) {
    req.session.authenticated = true;
    req.session.username = saveusername;
    res.redirect('/profile');
  } else {
    res.send('Invalid username or password');
  }
});

app.get('/profile', (req, res) => {
  if (req.session.authenticated) {
    console.log(req.session)
    res.send(`<h1>Welcome to your profile, ${req.session.username}</h1>`);
  } else {
    res.redirect('/login');
  }
});
function encodeHTML(text) {
  return text.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;')
             .replace(/"/g, '&quot;')
             .replace(/'/g, '&#x27;')
             .replace(/\//g, '&#x2F;');
}
// Server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
