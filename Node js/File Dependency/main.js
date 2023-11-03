// let file=require("./file");
// console.log(file);
// let {add}=require("./file");
// console.log(add(10,20));
let file1=require("./file");
let file2=require("./file2");
console.log(file1);
console.log(file2);
console.log(file1.file2.file==file1);
