 const express = require("express");
 const app = express()
 const jwt = require("jsonwebtoken");
 const JWT_SECRET = "your-secret-key";
 const mongoose = require("mongoose");
 const {UserModel,TodoModel} = require("./db");
 
 mongoose.connect("mongodb+srv://siserjuliet31:ShowPassword@cluster0.sqijbpl.mongodb.net/todo-app-database")
 app.use(express.json());

 app.post("/signup",async function(req,res){
     const email = req.body.email;
     const password = req.body.password;
     const name = req.body.name;

     const resj = await UserModel.create({
        email: email,
        password: password,
        name: name
     })  
      console.log(resj);
     res.json({
        message: "User Logged in successfully"
     })
 })

 app.post("/signin",async function(req,res){
     const email = req.body.email;
     const password = req.body.password;

     const user = await UserModel.findOne({
        email: email,
        password: password
     })
      console.log(user);
      
     if(user){
        const token = jwt.sign({
         email: user.email,
         id: user._id.toString()  
        },JWT_SECRET);
        res.json({
            token: token
        })
     }
     else{
        res.status(403).json({
            message: "Invalid Credentials"
        })
     }
 })

 function auth(req,res,next){
    const token = req.headers.token;
    const decodedata = jwt.verify(token, JWT_SECRET);

    if(decodedata){
        req.userId = decodedata.id;
        next();
    }
    else{
        res.status(403).json({
            message: "Invalid Token" 
            })
    }
 }



 app.post("/todo",auth,function(req,res){
    
    const userId = req.userId;    

     res.json({
        user:userId
     })
 })

 app.get("/todos",auth, function(req,res){
  const userId = req.user;

  res.json({
    user:userId
  })
 })

//  function auth(req, res, next) {
//     const token = req.headers.token;

//     const response = jwt.verify(token, JWT_SECRET);

//     if(response){
//         req.userId = token.userId;
//         next();
//     } else {
//         res.status(403).json({
//             message: "Incorrect creds"
//         })
//     }
// }
 
 app.listen(6000);
