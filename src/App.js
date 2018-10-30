import React, { Component } from 'react';
import { default as cars } from './cars.json';
import Order from './Order.js';
import Marque from './Marque';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    const ownedRaw = localStorage.getItem("owned");
    const owned = ownedRaw ? JSON.parse(ownedRaw) : [];
    const data = cars.sort((a,b) => (a.Car > b.Car) ? 1 : ((b.Car > a.Car) ? -1 : 0));
    const marques = cars.reduce((i, car)=>{
      if (i.indexOf(car.Marque)===-1) {
        i.push(car.Marque);
      }
      return i;
    }, []);
    this.state = {
      marques: marques,
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

  shortcut(letter){
    console.log("Jump to ",letter);
    const pos = this.state.marques.reduce((i,marque)=>{ if (marque.charAt(0)===letter && i==='') { return marque; } else{ return i; } }, '');

    let element = document.getElementById(`pos-${pos}`);
    element.scrollIntoView();

  }

  render() {

    const marqueList = this.state.marques.map((marque)=>{
      return <Marque key={`${marque}`} id={`${marque}`} onClick={this.toggleOwned} marque={marque} owned={this.state.owned} cars={this.state.cars} hide={this.state.hide} />
    });

    return (
      <div className="App">

        <div className="shortcuts">
          { ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].map((letter)=>{ return (<div key={letter} onClick={()=>{this.shortcut(letter)}}>{letter}</div>); }) }
        </div>

        {/* <div className="order">
          <Order onClick={this.toggleOrder} field="Car" title="Name" />
          <Order onClick={this.toggleOrder} field="Year" title="Year" />
          <Order onClick={this.toggleOrder} field="Class" title="Class" />
          <Order onClick={this.toggleOrder} field="Rarity" title="Rarity" />
          <Order onClick={this.hideOwned} field="Owned" title={this.state.hide===true?"Show owned":"Hide owned"} />
        </div> */}

        <div className="marques">
          {marqueList}
        </div>

      </div>
    );
  }
}

export default App;
