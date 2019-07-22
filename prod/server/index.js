const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send(console.log(req.app));
});

//Heroku Dynamic Port Binding
//https://www.udemy.com/node-with-react-fullstack-web-development/learn/lecture/7593686?start=412#bookmarks
const PORT = process.env.PORT || 5000;
app.listen(PORT);
