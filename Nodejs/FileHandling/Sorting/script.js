let fs=require("fs");
let path=require("path");
let file1=path.join(__dirname,"f1.txt");
let file2=path.join(__dirname,"f2.txt");

function read(file){
    return new Promise((resolve,reject)=>{
        fs.readFile(
            file,
            {
                encoding:"utf-8"
            },
            (err,data)=>{
                if(err) return reject(err.message);
                resolve(data);
            }
        )
    })
}
read(file1).then((data1)=>{
    console.log(data1);
    read(file2).then((data2)=>{
        console.log(data2);
        let res=data1+data2;
        console.log(res);
    })
})