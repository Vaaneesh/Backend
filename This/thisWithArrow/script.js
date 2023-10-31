//never use arrow function in object

let obj={
    name:"Vasu",
    age:21,
    fun:()=>{
        console.log(this);
    }
}
obj.fun();
let obj2={
    name:"Vasu",
    age:21,
    foo:function(){
    let fun=()=>{
        console.log(this);
    }
    fun();
}
}
obj2.foo();