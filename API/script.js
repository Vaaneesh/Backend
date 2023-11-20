const express=require("express");
const app=express();
let path=require("path");
app.use(express.urlencoded({extended:true}));
let todo=require("./todos/JS/script");
app.use(express.static(path.join(__dirname,"static")))
// let todos=[];
app.use
app.get("/gettodo",async(req,res)=>{
    // res.send(todos);
    let data=await todo.gettodo();
    res.send(data);
})
app.post("/addtodo",async(req,res)=>{
    let {task}=req.body;
    // todos.push(task);
    let msg=await todo.addtodo(task);
    res.send(msg);
})

app.listen(3000,()=>{
    console.log("server started!");
});