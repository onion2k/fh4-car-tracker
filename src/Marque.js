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

        const marqueCars = this.props.fh4State.marque(this.props.marque);
        const className = ["Marque"];

        if (this.props.fh4State.hideComplete) {
            if (marqueCars.filter((car)=>{
                return !car.Owned;
            }).length===0) {
                return null;
            }
        }

        let marqueCarsSortable = marqueCars.slice();

        const s = this.props.fh4State.sortField;
        const d = this.props.fh4State.sortDirection;

        switch (s) {
            case "Rarity":
                marqueCarsSortable = marqueCarsSortable.sort(
                    (a,b) => {
                        return (a[s] > b[s]) ? d : ((a[s] < b[s]) ? d * -1 : 0)
                    }
                );
                break;

            case "Year":
                marqueCarsSortable = marqueCarsSortable.slice().sort(
                    (a,b) => {
                        return parseInt(a[s]) < parseInt(b[s]) ? d : parseInt(a[s]) > parseInt(b[s]) ? d * -1 : 0;
                    }
                );

                break;

            case "Class":
                marqueCarsSortable = marqueCarsSortable.sort(
                    (a,b) => {
                        return (a[s] > b[s]) ? d : ((a[s] < b[s]) ? d * -1 : 0)
                    }
                );

                break;

            case "Car":
            default: 
                marqueCarsSortable = marqueCarsSortable.sort(
                    (a,b) => {
                        return (a[s].toLowerCase() > b[s].toLowerCase()) ? d : (a[s].toLowerCase() < b[s].toLowerCase() ? d * -1 : 0)
                    }
                );

                break;

        }

        const carsList = this.state.hide ? null : <div className="cars">{marqueCarsSortable.map((car)=>{
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