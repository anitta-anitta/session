const { User } = require('../models/users');

let data={  
 
   // user1:{username:"user1",acno:1001,password:"username",balance:3000,history:[]},
  //  user2:{username:"user2",acno:1002,password:"username2",balance:3000,history:[]},
   // user3:{username:"user3",acno:1003,password:"username3",balance:3000,history:[]},
    
 
 };

 let currentUser;

 function getUsers(){
     return data;
 }

 function addUser(username,password,acno){
        User.findOne({            //checking the user exist or not in db
            username       
        })
        .then(user=>{
            if(user){
                return {
                    statusCode:400,
                    message:"Account Already exist"

                }
            }
            const newUser = new User({
                username,password,acno,history:[],balance:0
            });
            newUser.save();

            return {
                statusCode:200,
                message:"Account Created Sucessfully"

            }
        })
        //data[username] = {username,password,acno,history:[],balance:0};
 }

 function login(username,password){
         
         return User.findOne({
             username,
             password
         })
         .then(user=>{
             if(user){
                return {
                statusCode:200,
                message:"Logged Sucessfully"

            };
         }
         return{
             statusCode:400,
             message:"Invalid credentials"
         }
    })
 }

  function deposite(username,amount){

    return User.findOne({
        username,
     })
     .then(user=>{
        if(user){
             
            user.balance+=amount
            let bal=user.balance;
           // btag.textContent="avaliable balance:"+bal
            user.history.push({
              typeOfTranscation:"Credit",
                amount:amount
             })
             user.save();
             return({statusCode:200,balance:bal,message:"Deposit Successfully"});
        }
   
    return{
        statusCode:400,
        message:"Invalid detials"
          }
      })
 }

 function withdraw(username,amount){
      
    return User.findOne({
        username,
     })
     .then(user=>{
        if(user){
             
            if(amount>user.balance){
                return {statusCode:400,balance:user.balance,message:"insufficient balance"};
               }
            user.balance-=amt
            let bal=user.balance
         // btag.textContent="available balance:"+bal
             user.history.push({
                  typeOfTranscation:"Debit",
                   amount:amount
             })
             user.save();
             return({statusCode:200,balance:bal,message:"Withdraw Successfully"});
        }
   
    return{
        statusCode:400,
        message:"Invalid detials"
          }
      })
 }


 function setCurrentUser(){
     return currentUser;
  }


 function getCurrentUser(username){
    currentUser= username;
  }

 module.exports = {
    
     getUsers,
     addUser,
     login,
     deposite,
     withdraw,
    // setCurrentUser:setCurrentUser,
   // getCurrentUser:getCurrentUser
 }