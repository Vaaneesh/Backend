const express=require("express");
const app=express();
const path=require("path");
app.use(express.static(path.join(__dirname,"static")))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','hbs');

app.get("/",(req,res)=>{
    res.render("home");
})








app.listen(4444,()=>{
    console.log("Server started!");
})