import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import Order from './Order.js';
import './Marque.css';

class Options extends Component {
    
    render(){

        const dir = this.props.fh4State.sortDirection===1 ? "▼" : "▲";
        const sort = ['Car', 'Year', 'Class', 'Rarity'];

        const orderOptions = sort.map((order)=>{
            const label = this.props.fh4State.sortField===order ? `${order} ${dir}` : order;
            return (<Order class={this.props.fh4State.sortField===order?"selected":""} onClick={()=>{this.props.fh4State.sortCars(order)}} title={`${label}`} />);
        })

        return (<div className="order">
            {orderOptions}
            <Order onClick={this.props.fh4State.toggleHideOwned} field="Owned" title={this.props.fh4State.hideOwned===true?"Show owned":"Hide owned"} />
            <Order onClick={this.props.fh4State.toggleHideComplete} field="Owned" title={this.props.fh4State.hideComplete===true?"Show complete":"Hide complete"} />
        </div>);
    }
}

export default inject("fh4State")(observer(Options));