const { rejects } = require("assert");
let fs=require("fs");
let path= require("path");
let filePath=path.join(__dirname,"..","data","todo.js")
class todo{
    static gettodo(){
        return new Promise((resolve,reject)=>{
            fs.readFile(filePath,
            {
                encoding:"utf-8"
            },
            (err,data)=>{
                if(err)return reject(err.message);
                resolve(JSON.parse(data));
            }
            )
        })
    }
    static addtodo(value){
        return new Promise((resolve,reject)=>{
            fs.readFile(filePath,
                {
                    encoding:"utf-8"
                },
                (err,data)=>{
                    if(err)return reject(err.message);
                    if(data.length>0){
                        data=JSON.parse(data);
                        data.push(value);
                        fs.writeFile(filePath,
                            JSON.stringify(data),
                            (err)=>{
                                if(err)return reject(err.message);
                                resolve("task added successfully!");
                            })
                    }
                }
                )
        })
    }
}
module.exports=todo;