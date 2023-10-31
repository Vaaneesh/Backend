function fun(name,age){
    this.name=name;
    this.age=age;
}
let obj=new fun("Vasu",21);
console.log(obj.name,obj.age);