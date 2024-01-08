const express=require('express');
const app=express();
const path=require("path")
const mongoose=require("mongoose");
const user=require("./model/user");
const blog=require("./model/blog");
const session=require('express-session');

app.use(express.static(path.join(__dirname,"static")))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'hbs');
app.use(session({
    secret: 'keyboard cat',
}))

function checkIsLoggedIn(req,res,next){
   if(req.session.isLoggedin){
            next();
    }
        else{
            res.redirect("/login");
        }
}
app.get("/",checkIsLoggedIn,(req,res)=>{
    res.render("home",{user:req.session.user});
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
    let Founduser=await user.findOne({username:username})
    if(Founduser){
        if(Founduser.password!=password){
            res.send("Invalid password");
        }else{
            req.session.isLoggedin=true;
            req.session.user=Founduser;
            res.redirect("/");
        }
    }else{
        res.send("user not found!!!");
    }
})
app.post("/addblog",async(req,res)=>{
    const {title,content}=req.body;
    let newBlog=new blog({title,content,user:req.session.user._id});
    await newBlog.save();
    let userrr=await user.findOne({_id:req.session.user._id});
    userrr.blog.push(newBlog._id);
    await userrr.save();
    res.send("Done");
})
app.get("/myblog",async(req,res)=>{
    let User1=await user.findById(req.session.user._id).populate("blog");
    console.log(User1);
    res.render("myblog",{blogs:User1.blog});

})
mongoose.connect("mongodb://127.0.0.1:27017/g26Session").then(()=>{
    app.listen(4444,()=>{
        console.log("Server started at port 4444");
    })
})


