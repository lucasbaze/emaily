const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');
require('./models/User.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);

//https://www.udemy.com/node-with-react-fullstack-web-development/learn/lecture/7603018?start=644#bookmarks
// Same as the line above
// const authRoutes = require('./routes/authRoutes.js');
// authRoutes(app);

app.get('/', (req, res) => {
    console.log('Ay Okay');
    return res.send('Hello There!');
});

app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});

//Heroku Dynamic Port Binding
//https://www.udemy.com/node-with-react-fullstack-web-development/learn/lecture/7593686?start=412#bookmarks
const PORT = process.env.PORT || 5000;
app.listen(PORT);
