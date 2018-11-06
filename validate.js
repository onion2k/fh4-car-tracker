const fs = require('fs');
const cars = require("./cars.json");
const oldcars = require("./src/cars.json");
const keys = [];

cars.map((car)=>{
    keys.push(car.Year+" "+car.Car);
    keys.push(car.OldCar);
});

oldcars.map((car)=>{
    if (keys.indexOf(car.Year+" "+car.Car)===-1) {
        console.log("Not found:", car.Year+" "+car.Car);
    }
});