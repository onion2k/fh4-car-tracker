import React, { Component } from 'react';
import { Provider } from "mobx-react";
import Options from './Options.js';
import MarqueList from './MarqueList';
import './App.css';

import fh4CarData from './state.js';

class App extends Component {

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

          <Options />
          <MarqueList />

        </div>
      </Provider>
    );
  }
}

export default App;
