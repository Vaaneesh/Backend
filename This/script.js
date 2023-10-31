console.log(this);
function foo(){
    return this;
}
console.log(foo());
let obj={
    fisrtName:"John",
    lastName:"xyz",
    fun: foo,
};
obj.fun();