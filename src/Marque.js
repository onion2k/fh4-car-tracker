import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import Car from './Car.js';
import './Marque.css';

class Marque extends Component {
    render(){
        const carsList = this.props.fh4State.marque(this.props.marque).map((car)=>{
            return <Car {...car} key={`${car.Year}-${car.Car}`} id={`${car.Year}-${car.Car}`} owned={car.Owned} onClick={this.props.onClick} />
        });

        return (<div className={"Marque"}>
            <div className="title" id={`pos-${this.props.marque}`}>{this.props.marque}</div>
            <div className="cars">{carsList}</div>
        </div>);
    }
}

export default inject("fh4State")(observer(Marque));