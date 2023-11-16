const express=require("express");
const app=express();
const path=require("path");
// app.get("/",(req,res)=>{
//     res.send("Yo sup!!");
// })
app.use(express.static(path.join(__dirname,"static")));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
})
app.get("/users/:name/:age",(req,res)=>{
    const username=req.params.name;
    const age=req.params.age;
    console.log(username);
    res.send(`${username},${age}`);
})
// app.get("/users",(req,res)=>{
//     const username=req.query.name;
//     const age=req.query.age;
//     res.send(`username is ${username} & age is ${age}`);
// })
app.get("/about",(req,res)=>{
    res.send("<h1>About me </h1>")
})
app.listen(3333,()=>{
    console.log("Server Started");
});