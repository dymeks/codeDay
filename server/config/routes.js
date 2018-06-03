const users = require("../controllers/users.js");
const routes = require('../controllers/userRoutes.js');

module.exports = function(app){

    app.get('/',function(req,res){
        users.renderLogReg(req,res);
    })

    app.post('/registration',function(req,res){
        users.register(req,res);
    })

    app.get('/login',function(req,res){
        users.loadLogin(req,res);
    })

    app.post('/login',function(req,res){
        users.login(req,res);
    })

    app.get('/logout',function(req,res){
        users.logout(req,res);
    })

    app.get('/routes',function(req,res){
        routes.renderNewRoute(req,res);
    })

    app.post('/routes',function(req,res){
        routes.newRoute(req,res);
    });

}