import React, { Component } from 'react';
import './Car.css';

export default class Car extends Component {
    render(){
        const className = this.props.owned ? 'Car Owned' : 'Car';
        return (<div className={className} onClick={()=>{ this.props.onClick(this.props.id) }}>
            {this.props.Car}  {this.props.Year}
        </div>);
    }
}