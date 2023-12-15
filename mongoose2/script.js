const express=require('express');
// const { default: mongoose } = require('mongoose');
const app=express();
const path=require("path")
const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname,"static")))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'hbs');









app.listen(3333,()=>{
        console.log("Server started at port 3333");
})
