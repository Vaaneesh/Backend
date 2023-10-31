class Vehicle{
    constructor(name,price,model){
        this.name=name,
        this.price=price,
        this.model=model
    }
    set setPrice(price){
        this.price=price;
    }
    get getPrice(){
        return this.price;
    }
    getModel(){
        return this.model;
    }
    static fun(){
        console.log("fun");
        return 0;
    }
}
class Car extends Vehicle{
    constructor(name,price,model,color,tyres){
        super(name,price,model); //sari properites le ayegi parent class
        this.color=color;
        this.tyres=tyres;
    }
}
let veh1=new Car("Swift",800000,2023,"Black",4);
console.log(veh1);
class Student{
    constructor(name,roll,dob){
        this.name=name;
        this.roll=roll;
        this.dob=dob;
    }
}
let obj=new Vehicle("Seltos",1300000,"2022");
obj.setPrice=20;
console.log(obj);
console.log(obj.getPrice);
console.log(obj.getModel());


let obj2=new Vehicle("Verna",1100000,"2023");
let st1=new Student("Vasu",1483,"01/09/2002");
console.log(obj2);
console.log(st1);