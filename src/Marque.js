import React, { Component } from 'react';
import './Marque.css';

export default class Marque extends Component {
    render(){
        console.log(this.props)
        return (<div className={"Car"}>
            {this.props.marque}
        </div>);
    }
}