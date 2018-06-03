var User = require("../models/home.js")['user'];
const bcrypt = require('bcrypt');
const saltRounds = 10;
const session = require('express-session');

module.exports = {
    dashboard: function(req,res){
        res.render('dashboard');
    },
    renderLogReg: function(req,res){
        res.render('index',{errors:[]});
    },
    register: function(req,res){
        User.findOne({name: req.body.name},function(err,user){
            if(user == null){
                if(req.body.password === req.body.password_confirm){
                    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                        // Store hash in your password DB.
                        var user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            phone: req.body.phone
                        });
            
                        console.log(user);
                        user.save({runValidators:true},function(err){
                            console.log("I'm in save!");
                            if(err)
                            {   
                                console.log(err);
                                errors = [];
                                for(var key in err.errors)
                                {
                                    console.log(err);
                                    errors.push(err.errors[key].message);
                                }
                                res.render('index',{errors});
                            } else {
                                console.log(user.name);
                                req.session.user_id = user._id;
                                res.redirect('/dashboard');
                            }
                        })
                        console.log("After save!");
                    });
                } else {
                    console.log("Password and Password confirm must match!");
                    errors = [];
                    errors.push("Password and Password confirm must match!");
                    res.render('index',{errors});
                }
            } else {
                errors = [];
                errors.push("Name already exists try logging in.");
                res.render('index',{errors})
            }
        })
         
    },
    login:function(req,res){
        User.findOne({email:req.body.email},function(err,user){
            if(err){
                res.render('index',{error:'Email not Found'});
            } 
    
            hash = user.password;
            bcrypt.compare(req.body.password, hash, function(err, response) {
                if(err)
                {
                    res.render('index',{error:'Password does not match'});
                } else {
                    req.session.user_id = user._id;
                    res.redirect('/dashboard');
                }
            });
            
        })
    },
    logout:function(req,res){
        req.session.destroy();
        res.render('index',{errors:[]});
    }
    
}