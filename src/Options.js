import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import Order from './Order.js';
import './Marque.css';

class Options extends Component {
    
    render(){
        return (<div className="order">
            <Order class={this.props.fh4State.sortField==="Car"?"selected":""} onClick={()=>{this.props.fh4State.sortCars("Car")}} title="Name" />
            <Order class={this.props.fh4State.sortField==="Year"?"selected":""} onClick={()=>{this.props.fh4State.sortCars("Year")}} title="Year" />
            <Order class={this.props.fh4State.sortField==="Class"?"selected":""} onClick={()=>{this.props.fh4State.sortCars("Class")}} title="Class" />
            <Order class={this.props.fh4State.sortField==="Rarity"?"selected":""} onClick={()=>{this.props.fh4State.sortCars("Rarity")}} title="Rarity" />
            <Order onClick={this.props.fh4State.toggleHideOwned} field="Owned" title={this.props.fh4State.hideOwned===true?"Show owned":"Hide owned"} />
            <Order onClick={this.props.fh4State.toggleHideComplete} field="Owned" title={this.props.fh4State.hideComplete===true?"Show complete":"Hide complete"} />
        </div>);
    }
}

export default inject("fh4State")(observer(Options));