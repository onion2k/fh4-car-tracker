import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import './Shortcuts.css';

class Shortcuts extends Component {

    shortcut = this.shortcut.bind(this);
    
    shortcut(letter){
        const pos = this.props.fh4State.marques.reduce((i,marque)=>{ if (marque.charAt(0)===letter && i==='') { return marque; } else{ return i; } }, '');
        let element = document.getElementById(`pos-${pos}`);
        element.scrollIntoView();
    }
    render(){
        return (
            <div className="shortcuts">
            { ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].map((letter)=>{ return (<div key={letter} onClick={()=>{this.shortcut(letter)}}>{letter}</div>); }) }
          </div>
        );
    }
}

export default inject("fh4State")(observer(Shortcuts));