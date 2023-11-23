let express=require("express");
let app=express();
app.set('view engine','hbs');

app.get("/home",(req,res)=>{
    res.render("home");
})
app.get("/about",(req,res)=>{
    res.render("about",{
        name:"Vasu",
        id:"123"
    });

})
app.listen(3333,()=>{
    console.log("Server started");
});