const express=require('express');
const app=express();
const path=require("path")
const mongoose=require("mongoose");
const user=require("./model/user");
app.use(express.static(path.join(__dirname,"static")))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'hbs');


app.get("/",(req,res)=>{
    res.render("home");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/register",(req,res)=>{
    res.render("register");
})
app.post("/register",async(req,res)=>{
    const {username,password}=req.body;
    const newUser=new user({username,password});
    await newUser.save();
    res.send("User registered successfully");
})
app.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    let user=await user.findOne({username:username})
    if(user){
        if(user.password!=password){
            res.send("Invalid password");
        }else{
            res.redirect("/");
        }
    }else{
        res.send("user not found!!!");
    }
})

mongoose.connect("mongodb://127.0.0.1:27017/g26Session").then(()=>{
    app.listen(4444,()=>{
        console.log("Server started at port 4444");
    })
})


