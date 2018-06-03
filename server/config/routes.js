const users = require("../controllers/users.js");
const routes = require('../controllers/userRoutes.js');

module.exports = function(app){

    app.get('/',function(req,res){
        if(req.session.user_id){
            res.redirect('/dashboard');
        } else {
            users.renderLogReg(req,res);
        }
        
    })

    app.post('/registration',function(req,res){
        users.register(req,res);
    })

    app.get('/my_routes',function(req,res){
        if(req.session.user_id){
            routes.allRoutes(req,res);            
        } else {
            res.redirect('/');
        }
            
    });
    // app.get('/login',function(req,res){
    //     if(req.session.user_id){
    //         users.dashboard(req,res);
    //     } else {
    //         users.loadLogin(req,res);
    //     }
        
    // })

    app.post('/login',function(req,res){
        users.login(req,res);
    })

    app.get('/dashboard', function(req, res){
        if(req.session.user_id){
            users.dashboard(req,res);
        } else {
            res.redirect('/');
        }
        
    })

    app.get('/join/:routeId', function(req,res){
        if(req.session.user_id){
            routes.join(req,res);
        } else {
            res.redirect('/');
        }
        
    })

    app.get('/logout',function(req,res){
        users.logout(req,res);
    })

    app.get('/routes',function(req,res){
        if(req.session.user_id){
            routes.renderNewRoute(req,res);
        } else {
            res.redirect('/');
        }
        
    })
    app.get('/delete/:id',function(req,res){
        routes.delete(req,res);
    })
    app.post('/routes',function(req,res){
        routes.newRoute(req,res);
    });

}