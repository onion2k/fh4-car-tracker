import React, { Component } from 'react';
import { Provider } from "mobx-react";
import { default as cars } from './cars.json';
import Order from './Order.js';
import MarqueList from './MarqueList';
import './App.css';

import fh4CarData from './state.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      hide: false
    }
    this.toggleOrder = this.toggleOrder.bind(this);
    this.hideOwned = this.hideOwned.bind(this);
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

  shortcut(letter){
    const pos = this.state.marques.reduce((i,marque)=>{ if (marque.charAt(0)===letter && i==='') { return marque; } else{ return i; } }, '');
    let element = document.getElementById(`pos-${pos}`);
    element.scrollIntoView();
  }

  render() {

    return (
      <Provider {...fh4CarData}>
        <div className="App">

          <div className="shortcuts">
            { ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].map((letter)=>{ return (<div key={letter} onClick={()=>{this.shortcut(letter)}}>{letter}</div>); }) }
          </div>

          <div className="order">
            <Order onClick={this.toggleOrder} field="Car" title="Name" />
            <Order onClick={this.toggleOrder} field="Year" title="Year" />
            <Order onClick={this.toggleOrder} field="Class" title="Class" />
            <Order onClick={this.toggleOrder} field="Rarity" title="Rarity" />
            <Order onClick={this.hideOwned} field="Owned" title={this.state.hide===true?"Show owned":"Hide owned"} />
          </div>

          <MarqueList />

        </div>
      </Provider>
    );
  }
}

export default App;
