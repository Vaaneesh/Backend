let userData=[
    {
        name:"Vasu",
        age:21
    },
    {
        name:"Ashu",
        age:27
    }
]
let fs=require("fs");
let path=require("path");
let fileName="user.json";
let filePath=path.join(__dirname,"..","data",fileName);