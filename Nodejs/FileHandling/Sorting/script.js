let fs=require("fs");
let path=require("path");
let file1=path.join(__dirname,"f1.txt");
let file2=path.join(__dirname,"f2.txt");

function sort(arr){
    arr.sort(function(a,b){
        return a-b;
    });
}

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
    read(file2).then((data2)=>{
        let res=data1+data2;
        res=res.split("\r\n");
        console.log(res);
        sort(res);
        console.log(res);
    })
})