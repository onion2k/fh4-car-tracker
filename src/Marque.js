import React, { Component } from 'react';
import Car from './Car.js';
import './Marque.css';

export default class Marque extends Component {
    render(){
        const carsList = this.props.cars.reduce((i, car)=>{ if (car.Marque===this.props.marque) i.push(car); return i; }, []).map((car)=>{
            const owned = this.props.owned.indexOf(`${car.Year}-${car.Car}`)===-1 ? false : true;
            if (owned && this.props.hide) {
              return null;
            }
            return <Car {...car} key={`${car.Year}-${car.Car}`} id={`${car.Year}-${car.Car}`} onClick={this.toggleOwned} />
        });

        return (<div className={"Marque"}>
            <div className="title">{this.props.marque}</div>
            <div className="cars">{carsList}</div>
        </div>);
    }
}