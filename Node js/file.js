console.log("Running file1....");
let file2=require("./file2");
// let x=10;
// function add(a,b){
//     return a+b
// }
function cat(){
    console.log("meow")
}
let food="Fish";

module.exports.cat=cat;
module.exports.food=food;
module.exports.file2=file2;
// module.exports.x=x;
// module.exports.add=add;

// module.exports={
//     cat,
//     food,
//     file2
// }