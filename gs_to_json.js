const fs = require('fs');
const csvtojson = require("csvtojson");
const soundex = require('soundex');
const fh4cars = [];
const sndx = {};
const keys = [];
let n = 0;
const oldcars = require("./src/cars.json");

const getData = async () => {
    const data = await csvtojson().fromFile("fh4.csv");
    return data;
}

const manualOldCars = {
    "2016 Alfa Romeo Giulia Quadrifoglio Forza Edition": "2017 Alfa Romeo Giulia Quadrifoglio Forza Edition",
    "2554 AMG TD M12S Warthog CST": "2554 AMG Transport Dynamics M12S Warthog CST",
    "2017 Aston Martin DB11 PreOrder Car": "2017 Aston Martin DB11",    
    "2015 Audi TTS Coupe": "2015 Audi TTS Coupé",
    "2013 Audi R8 Coupe V10 plus 5.2 FSI quattro": "2013 Audi R8 Coupé V10 plus 5.2 FSI quattro",
    "2011 Audi RS 5 Coupe": "2011 Audi RS 5 Coupé",
    "2016 BMW M2 Coupe [F22]": "2016 BMW M2 Coupé",
    "2012 BMW M5 [F10]": "2012 BMW M5",
    "2017 Chevrolet Camaro [Gen 6] ZL1": "2017 Chevrolet Camaro ZL1",
    "2017 Chevrolet Camaro ZL1 Preorder Car": "2017 Chevrolet Camaro ZL1",
    "1988 Chevrolet Monte Carlo Super Sport": "1985 Chevrolet Monte Carlo Super Sport",
    "1979 Chevrolet Camaro  [Gen 2.2] Z28": "1979 Chevrolet Camaro Z28",
    "1970 Chevrolet Camaro [Gen 2.1] Z28": "1970 Chevrolet Camaro Z28",
    "1969 Chevrolet Camaro  [Gen 1] Super Sport Coupe": "1969 Chevrolet Camaro Super Sport Coupe",
    "2017 Ford Focus RS Preorder Car": "2017 Ford Focus RS",
    "1985 Ford RS200 Evolution": "1985 Ford RS200",
    "1973 Ford Capri RS3100 [MKI]": "1973 Ford Capri RS3100",
    "2016 Formula Drift #98 BMW 325i": "1989 Formula Drift #98 BMW 325i",
    "2015 Formula Drift #118 Nissan 240SX": "1995 Formula Drift #118 Nissan 240SX",
    "2006 Formula Drift #232 Nissan 240SX": "1996 Formula Drift #232 Nissan 240SX",
    "1996 Formula Drift #43 Dodge Viper SRT10": "2006 Formula Drift #43 Dodge Viper SRT10",
    "1995 Formula Drift #13 Ford Mustang": "2015 Formula Drift #13 Ford Mustang",
    "1989 Formula Drift #530 HSV Maloo Gen-F": "2016 Formula Drift #530 HSV Maloo Gen-F",
    "2015 Honda Civic Type R": "2016 Honda Civic Type R",
    "1965 Hoonigan Gymkhana 10 Ford Hoonicorn Mustang": "1965 Hoonigan Gymkhana 10 Ford Hoonicorn Mustang",
    "2011 Hot Wheels Bone Shaker": "2011 Hot Wheels Bone Shaker",
    "1969 Hot Wheels Twin Mill": "1969 Hot Wheels Twin Mill",
    "2016 HSV Limited Edition Gen-F GTS Maloo": "2014 HSV Limited Edition Gen-F GTS Maloo",
    "2015 Jaguar F-TYPE R Coupe": "2015 Jaguar F-Type R Coupé",
    "2015 James Bond Aston Martin DB10 James Bond Edition": "2015 James Bond Edition Aston Martin DB10",
    "2010 James Bond Jaguar C-X75 James Bond Edition": "2010 James Bond Edition Jaguar C-X75",
    "2008 James Bond Aston Martin DBS James Bond Edition": "2008 James Bond Edition Aston Martin DBS",
    "1999 James Bond BMW Z8 James Bond Edition": "1999 James Bond Edition BMW Z8",
    "1986 James Bond Aston Martin V8 James Bond Edition": "1986 James Bond Edition Aston Martin V8",
    "1981 James Bond Citroen 2CV6 James Bond Edition": "1981 James Bond Edition Citroën 2CV6",
    "1977 James Bond Lotus Esprit S1 James Bond Edition": "1977 James Bond Edition Lotus Esprit S1",
    "1974 James Bond AMC Hornet James Bond Edition": "1974 James Bond Edition AMC Hornet X Hatchback",
    "1969 James Bond Aston Martin DBS James Bond Edition": "1969 James Bond Edition Aston Martin DBS",
    "1964 James Bond Aston Martin DB5 James Bond Edition": "1964 James Bond Edition Aston Martin DB5",
    "2014 Lamborghini Huracan LP 610-4": "2014 Lamborghini Huracán LP 610-4",
    "2014 Lamborghini Urus": "2014 Lamborghini Urus Concept",
    "2008 Lamborghini Reventon Forza Edition": "2008 Lamborghini Reventón Forza Edition",
    "1968 Lancia Fulvia Coupe Rallye 1.6 HF": "1968 Lancia Fulvia Coupé Rallye 1.6 HF",
    "1997 Mazda RX-7 [FD]": "1997 Mazda RX-7",
    "1990 Mazda Savanna RX-7 [FC]": "1990 Mazda Savanna RX-7",
    "2018 McLaren 720S": "2018 McLaren 720S Coupe",
    "2017 Mercedes-AMG GT R Preorder Car": "2017 Mercedes-AMG GT R",
    "2016 Mercedes-AMG C 63 S Coupe": "2016 Mercedes-AMG C 63 S Coupé",
    "2012 Mercedes-Benz C 63 AMG Coupe Black Series": "2012 Mercedes-Benz C 63 AMG Coupé Black Series",
    "1954 Mercedes-Benz 300 SL Coupe": "1954 Mercedes-Benz 300 SL Coupé",
    "1966 MG MGB GT": "1965 MG MGB GT",
    "2017 Nissan GT-R Preorder Car": "2017 Nissan GT-R",
    "2012 Nissan GT-R Black Edition [R35]": "2012 Nissan GT-R Black Edition",
    "2002 Nissan Skyline GT-R V-Spec II [R34]": "2002 Nissan Skyline GT-R V-Spec II",
    "1998 Nissan Silvia K's Aero [S14 Kouki]": "1998 Nissan Silvia K's Aero",
    "1994 Nissan Silvia K's [S14 Zenki]": "1994 Nissan Silvia K's",
    "2016 Porsche 911 GT3 RS Preorder Car": "2016 Porsche 911 GT3 RS",
    "1985 Porsche #185 959 Prodrive Rally Raid": "1986 Porsche #185 959 Prodrive Rally Raid",
    "2013 Renault Clio RS 200": "2013 Renault Clio R.S. 200 EDC",
    "2016 RJ Anderson #37 Polaris RZR-Rockstar Energy Pro 2 Truck": "2016 Polaris #37 Polaris RZR-Rockstar Energy Pro 2 Truck",
    "2016 Spania GTA GTA Spano": "2016 Spania GTA Spano",
    "2014 Volkswagen Golf R [Mk7]": "2014 Volkswagen Golf R",
    "2010 Volkswagen Golf R [Mk6]": "2010 Volkswagen Golf R",
    "2003 Volkswagen Golf R32 [Mk4]": "2003 Volkswagen Golf R32",
    "1945 Willys Jeep MB": "1945 Willys MB Jeep",
    "2015 McLaren 570S Coupe":"2015 McLaren 570S Coupé",
    "2012 Porsche 911 GT2 RS [997]": "2012 Porsche 911 GT2 RS"
}

oldcars.map((car)=>{
    keys.push(car.Year+" "+car.Car);
    let s = soundex(car.Year+" "+car.Car, true);
    sndx[car.Year+"-"+s] = car.Year+" "+car.Car;
});

const carsData = getData();

carsData.then((cars)=>{

    cars.map((car)=>{

        let oldcar = "";

        if (keys.indexOf(car.Year+" "+car.Make+" " +car.Model)===-1) {

            if (manualOldCars[car.Year+" "+car.Make+" " +car.Model]) {
                oldcar = manualOldCars[car.Year+" "+car.Make+" " +car.Model];
            } else {
                let s = sndx[car.Year+"-"+soundex(car.Year+" "+car.Make+" " +car.Model, true)];
                if (s) { oldcar = s; } else {
                    console.log("Lookup: ", car.Year+" "+car.Make+" " +car.Model);
                }
            }
        }

        fh4cars.push({
            "Rarity": car.Rarity,
            "Price": car["Buy Value"]+" CR",
            "Year": car.Year,
            "Car": car.Make+" " +car.Model,
            "Class": car.Class+" "+car.PI,
            "Marque": car.Make,
            "Championship Division": car["Championship Division"],
            "OldCar": oldcar
        })
    })

    fs.writeFile("cars.json", JSON.stringify(fh4cars, null, 2), function(err) {
        if(err) {
            return console.log(err);
        }
    }); 

});
