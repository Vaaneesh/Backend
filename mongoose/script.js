const express=require('express');
// const { default: mongoose } = require('mongoose');
const app=express();
const path=require("path")
const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname,"static")))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

let dbName="mydb";
let Kitten=require("./model/kitty");
app.post("/api/addkitty",async(req,res)=>{
    const {name}=req.body;
    let newKitty=new Kitten({name});
    await newKitty.save();
    res.send("Kitty added");
})

mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`).then(()=>{
    app.listen(3333,()=>{
        console.log("Server started");
    })
});
