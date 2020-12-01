let data={  
 
    user1:{username:"user1",acno:1001,password:"username",balance:3000,history:[]},
    user2:{username:"user2",acno:1002,password:"username2",balance:3000,history:[]},
    user3:{username:"user3",acno:1003,password:"username3",balance:3000,history:[]},
    
 
 };

 let currentUser;

 function getUsers(){
     return data;
 }

 function addUser(username,password,acno){
        data[username] = {username,password,acno,history:[],balance:0};
 }

 function setCurrentUser(){
     return currentUser;
  }


 function getCurrentUser(username){
    currentUser= username;
  }

 module.exports = {
    
     getUsers:getUsers,
     addUser:addUser,
     setCurrentUser:setCurrentUser,
     getCurrentUser:getCurrentUser
 }