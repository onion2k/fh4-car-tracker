import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import './Car.css';

class Car extends Component {
    render(){

        const classes = ['Car'];
        classes.push("Class-"+this.props.Class.substr(0, this.props.Class.indexOf(" ")));
        if (this.props.ForzaEdition) { classes.push("FE"); }
        if (this.props.Owned) { classes.push("Owned"); }

        return (<div className={classes.join(" ")} onClick={(e)=>{
            e.stopPropagation(); e.preventDefault();
            this.props.fh4State.toggle(this.props.id);
        }}>
            <div className="title">{this.props.Car}</div>
            <div className="class">{this.props.Class}</div>
            <div className="year">{this.props.Year}</div>
        </div>);

    }
}

export default inject("fh4State")(observer(Car));
