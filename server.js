const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(bp.json());
// app.use(express.static(path.join(__dirname,'./client/dist/client')));
// app.set('views',path.join(__dirname,'./client/views'));
// app.use(session({secret: "Shh, It's a secret!"}))
// require('./server/config/routes.js')(app);

app.listen(8000,function(){
    console.log("listening on port 8000");
})