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
let fileName="user2.json";
let filePath=path.join(__dirname,"..","data",fileName);

fs.writeFile(
    filePath,
    JSON.stringify(userData),
    (err)=>{
        if(err)console.log(err.message);
    }
)