const express=require('express');
const app=express();
const path=require("path")
const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname,"static")))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'hbs');

app.use("/posts",require("./routes/post"))





mongoose.connect("mongodb://127.0.0.1:27017/g26").then(()=>{
    app.listen(3334,()=>{
        console.log("Server started at port 3334");
    })
})


