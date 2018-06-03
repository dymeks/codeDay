// const mongoose = require('../config/mongoose.js');
const validate = require('mongoose-validator');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/codeday');
var nameValidator = [
    validate({
        validator:'isAlphanumeric',
        passIfEmpty:true,
        message:'Name should only contain alpha-numeric characters only',
    }),
];

var emailValidator = [
    validate({
        validator:'matches',
        arguments:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        message:'An email must be a valid email.', 
    })
];

var UsersSchema = new mongoose.Schema({
    name:{type: String, required:[true,"You must submit a name"],minLength:[2,"The name must be at least 2 letters!"]},
    email:{type: String, required:[true,"You must submit a email"], validate:emailValidator},
    phone:{type: String,required:[true,"You must submit phone number."]},
    password:{type: String, required:[true,"You must have a password"]}

},{timestamps:true})

// const author = mongoose.model('Author',AuthorsSchema);
const user = mongoose.model('User',UsersSchema);
module.exports = {'user':user};