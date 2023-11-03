console.log("Running file2.....")
let file=require("./file");


function dog(){
    console.log("cat says brrr");
}
let food="Chicken";
module.exports.dog=dog;
module.exports.food=food;
module.exports.file=file; //for circular dependancy
// module.exports={
//     dog,
//     food,
//     file
// }