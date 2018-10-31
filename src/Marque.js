import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import Car from './Car.js';
import './Marque.css';

class Marque extends Component {

    state = { hide: false };
    toggle = this.toggle.bind(this);

    toggle() {
        this.setState({ hide: !this.state.hide });
    }

    render(){

        let marqueCars = this.props.fh4State.marque(this.props.marque);
        const className = ["Marque"];

        if (this.props.fh4State.hideComplete) {
            if (marqueCars.filter((car)=>{
                return !car.Owned;
            }).length===0) {
                return null;
            }
        }

        marqueCars.sort((a,b) => (a[this.props.fh4State.sortField] > b[this.props.fh4State.sortField]) ? 1 : ((b[this.props.fh4State.sortField] > a[this.props.fh4State.sortField]) ? -1 : 0));

        const carsList = this.state.hide ? null : <div className="cars">{marqueCars.map((car)=>{
            if (this.props.fh4State.hideOwned && car.Owned) { return null; }
            return <Car {...car} key={`${car.Year}-${car.Car}`} id={`${car.Year}-${car.Car}`} Owned={car.Owned} />
        })}</div>;

        return (<div className={className.join(" ")}>
            <div className="title" id={`pos-${this.props.marque}`} onClick={ this.toggle }>{this.props.marque}</div>
            {carsList}
        </div>);
    }
}

export default inject("fh4State")(observer(Marque));