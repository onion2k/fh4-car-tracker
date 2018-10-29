import React, { Component } from 'react';
import { default as cars } from './cars.json';
import Order from './Order.js';
import Car from './Car.js';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    const ownedRaw = localStorage.getItem("owned");
    const owned = ownedRaw ? JSON.parse(ownedRaw) : [];
    const data = cars.sort((a,b) => (a.Car > b.Car) ? 1 : ((b.Car > a.Car) ? -1 : 0));
    this.state = {
      cars: data,
      owned: owned,
      hide: false
    }
    this.toggleOrder = this.toggleOrder.bind(this);
    this.hideOwned = this.hideOwned.bind(this);
    this.toggleOwned = this.toggleOwned.bind(this);
  }

  toggleOrder(field){
    const data = cars.sort((a,b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0));
    this.setState({
      cars: data
    });
  }

  hideOwned(){
    console.log("hide")
    this.setState({
      hide: !this.state.hide
    });
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
    const carsList = cars.map((car)=>{
      const owned = this.state.owned.indexOf(`${car.Year}-${car.Car}`)===-1 ? false : true;
      if (owned && this.state.hide) {
        return null;
      }
      return <Car {...car} key={`${car.Year}-${car.Car}`} id={`${car.Year}-${car.Car}`} onClick={this.toggleOwned} owned={owned} />
    });
    return (
      <div className="App">
        <div className="order">
          <Order onClick={this.toggleOrder} field="Car" title="Name" />
          <Order onClick={this.toggleOrder} field="Year" title="Year" />
          <Order onClick={this.toggleOrder} field="Class" title="Class" />
          <Order onClick={this.toggleOrder} field="Rarity" title="Rarity" />
          <Order onClick={this.hideOwned} field="Owned" title={this.state.hide===true?"Show owned":"Hide owned"} />
        </div>
        <div className="cars">
          {carsList}
        </div>
      </div>
    );
  }
}

export default App;
