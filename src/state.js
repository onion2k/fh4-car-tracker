import { configure, decorate, observable, action, computed } from "mobx";
import { default as carsData } from './cars.json';

configure({ enforceActions: "observed" });

class fh4CarData {

    constructor(){
        const ownedRaw = localStorage.getItem("fh4-owned");
        this.owned = ownedRaw ? JSON.parse(ownedRaw) : [];
        this.cars = carsData.sort((a,b) => (a.Car > b.Car) ? 1 : ((b.Car > a.Car) ? -1 : 0));
        this.hideOwned = false;
        this.hideComplete = false;
        this.sortField = "Car";
        this.sortDirection = -1;
    }

    toggleHideOwned = () => {
        this.hideOwned = !this.hideOwned;
    }

    toggleHideComplete = () => {
        this.hideComplete = !this.hideComplete;
    }

    sortCars = (field) => {
        if (this.sortField===field){
            this.sortDirection = this.sortDirection * -1;
        } else {
            this.sortField = field;
            this.sortDirection = -1;
        }
    }

    get marques() {
        return this.cars.reduce((i, car)=>{
            if (i.indexOf(car.Marque)===-1) {
                i.push(car.Marque);
            }
            return i;
        }, []);
    }

    marque = (marque) => {
        return this.cars.reduce((i, car)=>{ if (car.Marque===marque) i.push(car); return i; }, []).map((car)=>{
            if (this.owned.indexOf(`${car.Year}-${car.Car}`)!==-1 || this.owned.indexOf(`${car.OldCar}`)!==-1) {
                car.Owned = true;
            }
            return car;
        });
    }

    save = () => {
        localStorage.setItem('fh4-owned', JSON.stringify(this.owned));
    }

    toggle = (car) => {
        const i = this.owned.indexOf(car);
        const c = this.cars.find((c)=>{ return `${c.Year}-${c.Car}` === car; });

        if (i===-1) {
          this.owned.push(car);
          c.Owned = true;
        } else {
          this.owned.splice(i,1);
          c.Owned = false;
        }
        this.save();

    }

}

decorate(fh4CarData, {
    owned: observable,
    cars: observable,
    getOwned: action,
    toggle: action,
    sortCars: action,
    toggleHideOwned: action,
    toggleHideComplete: action,
    sortField: observable,
    sortDirection: observable,
    hideOwned: observable,
    hideComplete: observable,
    marques: computed,
    marque: action
});

const state = {
    fh4State: new fh4CarData()
};

export default state;