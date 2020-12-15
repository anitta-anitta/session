var express = require('express');
var router = express.Router();
var Bank = require('../services/bank');



function authMiddleware(req,res,next){
  //console.log("authMiddleware");
   if(req.session.currentUser){
      next();
  }
   else{
     //next("please login");
      res.status(401).send({message:"please login"});
  }
  
}

/* GET users listing. */
router.get('/', authMiddleware,function(req, res, next) {
 // res.send(Bank.getUsers());
     var result = Bank.getUsers();
     res.send(result);
});

router.post('/register', function(req, res, next) {
        let username=req.body.username;
        let password=req.body.password;
        let confirmPassword=req.body.confirmPassword;
        let acno=req.body.acno;
        //let data=Bank.getUsers();

        //if(username in data){
          //res.status(400).send({message:"user already exist please login"});
        //}else 
        if(password!==confirmPassword){
          res.status(400).send({message:"password and confirm password dosen't match"});
        }else{ 
            Bank.addUser(username,password,acno)
            .then(data=>{
              res.status(data.statusCode).send({message: data.message});
            })
             
            
          }
  
});
router.post('/login',function(req, res, next){
  let username=req.body.username;
  let pwd=req.body.password;

  Bank.login(username,pwd)
  .then(data=>{
    if(data.statusCode==200){
      req.session.currentUser=username;
    }
    res.status(data.statusCode).send({message: data.message});
  })

 // let data=Bank.getUsers();
 
    //if(username in data){
      //let password=data[username]["password"];
    //if(pwd===password){
      //    req.session.currentUser=username;
        //  Bank.setCurrentUser(username);
          //res.send({message:"login success!"});
          // window.location.href="home.html"
         // this.props.history.push("/home");
 //   }
   // else{
  //   
    //  res.status(400).send({message:"incorrect username or password"});
  //  }
  // }
  // else{
    //Bank.addUser(req.body.name);
   // res.status(400).send({message:"user doesnot exist"});
  // }
});


router.post('/deposit',authMiddleware, function(req, res, next) {

  let username=req.body.username;
  let amt=Number(req.body.amount);

  Bank.deposit(username,amt)
  .then(data=>{
        res.status(data.statusCode).send({message: data.message, balance:data.balance});
  })
  //let btag=document.querySelector("#bal");
 // let data=Bank.getUsers();
//if(username in data){
 // console.log(data[username]);
   //       data[username]["balance"]+=amt
     //     let bal=data[username]["balance"]
           //btag.textContent="avaliable balance:"+bal
       //    data[username]["history"].push({
         //      typeOfTranscation:"Credit",
           //    amount:amt
           //})
          // res.send({balance:bal,message:"Deposit Successfully"});
           
   //  }
//else{
  //res.status(400).end({message:"Invalid user"});
//}

});

router.post('/withdraw',authMiddleware, function(req, res, next) {
 
         let username=req.body.username
         let amt=Number(req.body.amount);

         if(username!=req.session.currentUser){
            return res.status(400).send({message:"Invalid Username"});
         }
      
         Bank.withdraw(username,amt)
         .then(data=>{
               res.status(data.statusCode).send({message: data.message, balance:data.balance});
         })

      //   return next(new error("Error"));
  //     let data=Bank.getUsers();    
    // if(username in data){
      // if(username!=req.session.currentUser){
        //return res.send({message:"Invalid Username"});
    //   }
      //       let avlbal=data[username]["balance"]
        //     if(amt>avlbal){
          //   res.status(400).send({message:"insufficient balance"});
         //  }
      //        data[username]["balance"]-=amt
        //       let bal=data[username]["balance"]
               // btag.textContent="available balance:"+bal
              
          //     data[username]["history"].push({
            //    typeOfTranscation:"Debit",
       //         amount:amt
         //   });
           // res.send({balance:bal,message:"withdraw Successfully"});
                   
//    }
  //   else{
    //  res.status(400).send({message:"Invalid user"});
     //}
    });

router.get('/transcation-history', function(req, res, next) {
  
    let data=Bank.getUsers();
    let username=req.session.currentUser;
    if(username in data){
      return res.send({history:data[username].history});
    }
    else{
      res.status(400).send({message:"Invalid user"});
    }
});

//router.get('/user/:id', function(req, res, next) {
 // res.send(req.params.id);
//});
module.exports = router;
