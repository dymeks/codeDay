var userRoute = require("../models/home.js")['userRoute'];
var User = require("../models/home.js")['user'];

const session = require('express-session');

module.exports = {
    newRoute: function(req,res){
        console.log("I'm creating a userRoutes!");
        User.findById(req.session.user_id,function(err,user){
            if(user != null){
                console.log(req.body);
                var route = new userRoute({
                    departureTime: req.body.time,
                    startAddress: req.body.start,
                    endAddress: req.body.end,
                    createdBy:user,
                    totalSeatsAvailible: req.body.seats
        
                })
        
                route.save({runValidators:true},function(err){
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
                        console.log(route.name);
                        // req.session.user_id = user._id;
                        res.redirect('/dashboard');
                    }
                })
            }
        })
        
    },
    allRoutes:function(req,res){
        userRoute.find({},function(err,routes){
            if(routes){
                res.render('display',{'routes':routes,'session':req.session});
            }
        })
    },

    join:function(req,res){
        User.findById(req.session.user_id,function(err,user){
            userRoute.findByIdAndUpdate(req.params.routeId,{$push:{passengers:user}},function(err,route){
                console.log("I'm updating passengers!")
                if(err){
                    errors = err;
                    res.render('index',{errors});
                } else {
                    route.totalSeatsAvailible = route.totalSeatsAvailible--;
                    console.log(route);
                    userRoute.findByIdAndUpdate(req.params.routeId,route,function(err,route){
                        if(err){
                            errors = err;
                            res.render('index',{errors});
                        } else {
                            res.redirect('/dashboard');
                        }
                    })
                    
                }
            })
        })
        
    },
    delete:function(req,res){
        userRoute.findByIdAndRemove(req.params.id,function(err, res){
            if(err){
                res.render('index',{errors:["Error: Removing"]});
            } else {
                res.redirect('/dashboard');
            }
        })
    },

    renderNewRoute:function(req,res){
        res.render('makeRoute');
    }
}