import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import './Car.css';

class Car extends Component {
    render(){
        const classes = ['Car'];
        classes.push("Class-"+this.props.Class.substr(0, this.props.Class.indexOf(" ")));
        if (this.props.owned) { classes.push("Owned"); }
        return (<div className={classes.join(" ")} onClick={(e)=>{
            e.stopPropagation(); e.preventDefault();
            this.props.fh4State.toggle(this.props.id);
        }}>
            {this.props.Car}  {this.props.Year}
        </div>);
    }
}

export default inject("fh4State")(observer(Car));