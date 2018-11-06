const fs = require('fs');
const soundex = require('soundex');
const cars = require("./src/cars.json");
const oldcars = require("./src/_cars.json");
const keys = [];
const sndx = {};
let n = 0;

const manualOldCars = {
    "": ""
}

cars.map((car)=>{
    keys.push(car.Year+" "+car.Car);
    let s = soundex(car.Year+" "+car.Car, true);
    sndx[s] = car.Year+" "+car.Car;
});

oldcars.map((car)=>{
    if (keys.indexOf(car.Year+" "+car.Car)===-1) {
        console.log("Not found:", car.Year+" "+car.Car);
        console.log("Might be:", sndx[soundex(car.Year+" "+car.Car, true)])
        n++;
    }
});

console.log("\n", n)
