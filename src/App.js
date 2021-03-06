import React, { Component } from 'react';
import { Provider } from "mobx-react";
import Shortcuts from './Shortcuts';
import Options from './Options';
import MarqueList from './MarqueList';
import Stats from "./Stats";
import './App.css';

import fh4CarData from './state.js';

class App extends Component {

  render() {

    return (
      <Provider {...fh4CarData}>
        <div className="App">

          <Shortcuts />
          <Options />
          <MarqueList />

          <Stats />

        </div>
      </Provider>
    );
  }
}

export default App;
