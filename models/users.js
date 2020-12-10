const mangoose = require('mongoose');

 const User = mongoose.model('User',{
    username: String,
    password: String,
    acno: Number,
    balance: Number,
    history: [{
        typeOfTranscation: String,
        amount: Number
    }]
 });
 module.exports = {
     User
 }