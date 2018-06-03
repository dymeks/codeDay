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
                        res.render('success');
                    }
                })
            }
        })
        
    },

    renderNewRoute:function(req,res){
        res.render('makeRoute');
    }
}