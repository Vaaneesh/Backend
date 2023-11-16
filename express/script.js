const express=require("express");
const app=express();
const path=require("path");
// app.get("/",(req,res)=>{
//     res.send("Yo sup!!");
// })
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
})
app.get("/about",(req,res)=>{
    res.send("<h1>About me </h1>")
})
app.listen(3333,()=>{
    console.log("Server Started");
});