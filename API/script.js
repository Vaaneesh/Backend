const express=require("express");
const app=express();
app.use(express.urlencoded({extended:true}));

let todos=[];

app.get("/gettodo",(req,res)=>{
    res.send(todos);
})
app.post("/addtodo",(req,res)=>{
    let {task}=req.body;
    todos.push(task);
    res.send("Task added");
})

app.listen(6666,()=>{
    console.log("server started!");
});