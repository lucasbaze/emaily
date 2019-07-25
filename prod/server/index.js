const express = require('express');
const mongoose = require('mongoose');
const { mongoURI } = require('./config/keys.js');
require('./models/User.js');
require('./services/passport.js');

mongoose.connect(mongoURI, { useNewUrlParser: true });

const app = express();

require('./routes/authRoutes.js')(app);

//https://www.udemy.com/node-with-react-fullstack-web-development/learn/lecture/7603018?start=644#bookmarks
// Same as the line above
// const authRoutes = require('./routes/authRoutes.js');
// authRoutes(app);

app.get('/', (req, res) => {
    return res.send('Hello There!');
});

//Heroku Dynamic Port Binding
//https://www.udemy.com/node-with-react-fullstack-web-development/learn/lecture/7593686?start=412#bookmarks
const PORT = process.env.PORT || 5000;
app.listen(PORT);
