const express=require("express");
const app=express();
const {Worker} = require('worker_threads')

app.get("/blocking",(req,res)=>{
    let worker = new Worker('./worker.js');
    
    worker.on('message',(data)=>{
        res.send(`data ${data}`);
    })
})
app.get('/non-blocking',(req,res)=>{
    res.send("non blocking response");
})
app.listen(3000,()=>{
    console.log("Server started")
})