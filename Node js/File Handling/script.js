let fs=require("fs");
fs.writeFile(
    "./data/data.txt",
    "Yo sup",
    {
        encoding:"utf-8",
        flag:"w"
    },
    (err)=>{
        if(err){
            console.log("Error occured!!");
        }
    }
)