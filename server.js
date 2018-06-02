const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');


const app = express();
app.set('view engine', 'ejs')

app.use(bp.json());
// app.use(express.static(path.join(__dirname,'./client/dist/client')));
// app.set('views',path.join(__dirname,'./client/views'));
// app.use(session({secret: "Shh, It's a secret!"}))
// require('./server/config/routes.js')(app);

app.get('/dashboard', function (req, res) {
    res.render('map');
  })

app.listen(8000,function(){
    console.log("listening on port 8000");
})