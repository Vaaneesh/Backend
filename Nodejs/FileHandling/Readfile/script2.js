let fs=require("fs");
let path=require("path");
let fileName="data2.txt";
let filePath=path.join(__dirname,"..","data",fileName);
fs.readFile(
    filePath,
    {
        encoding:"utf-8",
        flag:"r",
    },
    (err,data)=>{
        if(err) throw err;
        console.log(data);
    }
);