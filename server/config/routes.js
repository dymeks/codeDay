const users = require("../controllers/users.js");
module.exports = function(app){

    app.get('/',function(req,res){
        users.renderLogReg(req,res);
    })

    app.post('/registration',function(req,res){
        users.register(req,res);
    })

    app.post('/login',function(req,res){
        users.login(req,res);
    })

    app.get('/dashboard', function(req, res){
        users.dashboard(req,res);
    })

    app.get('/logout',function(req,res){
        users.logout(req,res);
    })

    // app.post('/registration',function(req,res){
    //     if(req.body.password === req.body.password_confirm){
    //         bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //             // Store hash in your password DB.
    //             var user = new User({
    //                 first_name: req.body.first_name,
    //                 last_name: req.body.last_name,
    //                 email: req.body.email,
    //                 password: hash,
    //                 birthday: req.body.birthday
    //             });
    
    //             console.log(user);
    //             user.save(function(err){
    //                 if(err)
    //                 {   
    //                     errors = [];
    //                     for(var key in err.errors)
    //                     {
    //                         console.log(err);
    //                         errors.push(err.errors[key].message);
    //                     }
    //                     res.render('index',{errors});
    //                 } else {
    //                     console.log(user._id);
    //                     req.session.user_id = user._id;
    //                     res.render('success');
    //                 }
    //             })
    //         });
    //     } else {
    //         console.log("Password and Password confirm must match!");
    //         res.render('index');
    //     }
    // })
}