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

        const s = this.props.fh4State.sortField;
        const d = this.props.fh4State.sortDirection;

        switch (s) {
            case "Rarity":
                marqueCars.sort(
                    (a,b) => {
                        return (a[s] > b[s]) ? d : ((a[s] < b[s]) ? !d : 0)
                    }
                );
                break;

            case "Year":
                marqueCars = marqueCars.slice().sort(
                    (a,b) => {
                        return parseInt(a[s]) < parseInt(b[s]) ? d : parseInt(a[s]) > parseInt(b[s]) ? !d : 0;
                    }
                );

                break;

            case "Class":
                marqueCars.sort(
                    (a,b) => {
                        return (a[s] > b[s]) ? d : ((a[s] < b[s]) ? !d : 0)
                    }
                );

                break;

            case "Car":
            default: 
                marqueCars.sort(
                    (a,b) => {
                        if (this.props.marque==="Acura") {
                            marqueCars.map((c)=>{ console.log(c.Car, a[s].toLowerCase()); });
                        }
                        return (a[s].toLowerCase() > b[s].toLowerCase()) ? d : (a[s].toLowerCase() < b[s].toLowerCase() ? !d : 0)
                    }
                );

                break;

        }

        if (this.props.marque==="Acura") {
            marqueCars.map((c)=>{ console.log(c.Car, c.Year); });
        }

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