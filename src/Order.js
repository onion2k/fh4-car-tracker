import React, { Component } from 'react';

export default class Order extends Component {
    render(){
        return (<div className="Car" onClick={()=>{ this.props.onClick(this.props.field) }}>{this.props.title}</div>);
    }
}