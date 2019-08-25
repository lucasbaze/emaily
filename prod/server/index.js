const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys.js');
require('./models/User.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);
require('./routes/billingRoutes.js')(app);

//https://www.udemy.com/node-with-react-fullstack-web-development/learn/lecture/7603018?start=644#bookmarks
// Same as the line above
// const authRoutes = require('./routes/authRoutes.js');
// authRoutes(app);

// if (process.env.NODE_ENV === 'production') {
//     //Express will serve up production assets
//     //like our main.js file, or main.css file
//     //When it asks for a specific file in the defined root directory
//     const path = require('path');
//     app.use('/static', express.static(path.join(__dirname, 'client/build')))
//
//     //Express will serve up the index.html file
//     //if it doesn't recognize the route
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

//I have no idea why this works and not the above code, but it does!
//Weee!
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('/client/build'));

    const root = require('path').join(__dirname, 'client', 'build');
    app.use(express.static(root));
    app.get('*', (req, res) => {
        res.sendFile('index.html', { root });
    });
}

//Heroku Dynamic Port Binding
//https://www.udemy.com/node-with-react-fullstack-web-development/learn/lecture/7593686?start=412#bookmarks
const PORT = process.env.PORT || 5000;
app.listen(PORT);
