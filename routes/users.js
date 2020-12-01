var express = require('express');
var router = express.Router();
var Bank = require('../services/bank');



function authMiddleware(req,res,next){
  //console.log("authMiddleware");
   if(Bank.getCurrentUser()){
      next();
  }
   else{
     // next("User not authenticated");
      res.status(401).send({message:"please login"});
  }
  
 
}

/* GET users listing. */
router.get('/', authMiddleware,function(req, res, next) {
  res.send(Bank.getUsers());
  res.send(result);
});

router.post('/register', function(req, res, next) {
        let username=req.body.username;
        let password=req.body.password;
        let confirmPassword=req.body.confirmPassword;
        let acno=req.body.acno;
        
        let data=Bank.getUsers();
        if(username in data){
          res.status(400).send({message:"user already exist please login"});
        }else if(password!==confirmPassword){
          res.status(400).send({message:"password and confirm password dosen't match"});
        }else{ 
             Bank.addUser(username,password,acno);
             res.send({message:"user registered successfully"});
         }
  
});
router.post('/login',function(req, res, next){
  let username=req.body.username;
  let pwd=req.body.password;
  let data=Bank.getUsers();
 
  if(username in data){

    let password=data[username].password
    if(pwd===password){
     
         Bank.setCurrentUser(username);
          res.send({message:"login success!"});
     // window.location.href="home.html"
          this.props.history.push("/home");
    }
    else{
     
      res.status(400).send({message:"incorrect username or password"});
    }
   }
   else{
    //Bank.addUser(req.body.name);
    res.status(400).send({message:"user doesnot exist"});
   }
});


router.post('/deposit',authMiddleware, function(req, res, next) {

  let username=req.body.username;
  let amt=Number(req.body.amount);
  //let btag=document.querySelector("#bal");
  let data=Bank.getUsers();
if(username in data){
          data[username]["balance"]+=amt
          let bal=data[username]["balance"]
           //btag.textContent="avaliable balance:"+bal
           data[username]["history"].push({
               typeOfTranscation:"Credit",
               amount:amt
           })
           res.send({balance:bal,message:"Deposit Successfully"});
           
     }
else{
  res.status(400).end({message:"Invalid user"});
}

});

router.post('/withdraw',authMiddleware, function(req, res, next) {
 
  let username=req.body.username
         let amt=Number(req.body.amount);
         let data=Bank.getUsers();
         let amt=Number(req.body.amount);
      //   return next(new error("Error"));
     if(username in data){
       if(username!=Bank.getCurrentUser){
        return res.send({message:"Invalid Username"});
       }
             let avlbal=data[username]["balance"]
             if(amt<avlbal){
             res.status(400).send({message:"insufficient balance"});
           }
     else{
              data[username]["balance"]-=amt
               let bal=data[username]["balance"]
               // btag.textContent="available balance:"+bal
              
               data[username]["history"].push({
                typeOfTranscation:"Debit",
                amount:amt
            });
            res.send({balance:bal,message:"withdraw Successfully"});
           
             }
     }
     else{
      res.status(400).send({message:"Invalid user"});
     }
});

router.get('/transcation-history', function(req, res, next) {
    let data=Bank.getUsers();
    if(username in data){
      return  res.send({history:data[username].history});
    }
    else{
      res.status(400).send({message:"Invalid user"});
    }
});

//router.get('/user/:id', function(req, res, next) {
 // res.send(req.params.id);
//});
module.exports = router;
