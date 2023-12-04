let express=require("express");
let app=express();
app.set('view engine','hbs');
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

let todos=[
    {name:"cricket",id:1},
    {name:"hockey",id:2},
    {name:"football",id:3},
]

app.get("/",(req,res)=>{
    res.render("home");
})
app.get("/home",(req,res)=>{
    res.render("home");
})
app.get("/about",(req,res)=>{
    res.render("about",{
        name:"Vasu",
        id:"123"
    });

})
app.get("/todos",(req,res)=>{
    res.render("todo",{
        todos:todos
    })
})
app.listen(3333,()=>{
    console.log("Server started");
});