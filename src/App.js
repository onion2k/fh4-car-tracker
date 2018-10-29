import React, { Component } from 'react';
import { default as cars } from './cars.json';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    const ownedRaw = localStorage.getItem("owned");
    const owned = ownedRaw ? JSON.parse(ownedRaw) : [];
    this.state = {
      cars: cars,
      owned: owned
    }
  }

  state = {
    cars: cars
  }

  toggleOwned(car) {
    const owned = this.state.owned;
    const i = owned.indexOf(car);
    if (i===-1) {
      owned.push(car);
    } else {
      owned.splice(i,1);
    }
    this.setState(owned, ()=>{
      localStorage.setItem("owned", JSON.stringify(owned));
    });
  }

  render() {

    const cars = this.state.cars.sort((a,b) => (a.Car > b.Car) ? 1 : ((b.Car > a.Car) ? -1 : 0));

    const carsList = cars.map((car)=>{
      const className = this.state.owned.indexOf(car.Car)===-1 ? 'Car' : 'Car Owned';
      return <div className={className} key={`${car.Year}-${car.Car}`} onClick={ ()=>this.toggleOwned(car.Car) }>{car.Car}</div>
    });

    return (
      <div className="App">
        {carsList}
      </div>
    );
  }
}

export default App;
