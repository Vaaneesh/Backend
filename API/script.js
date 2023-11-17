const express=require("express");
const app=express();
app.use(express.urlencoded({extended:true}));

let todo=require("./todos/JS/script");
// let todos=[];

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

app.listen(6666,()=>{
    console.log("server started!");
});