import React, { Component } from 'react';
import { inject, observer } from "mobx-react";

class Stats extends Component {
    render(){
        return (<div className="Stats">
            Current ownership: {this.props.fh4State.owned.length} of {this.props.fh4State.cars.length} cars.
        </div>);
    }
}

export default inject("fh4State")(observer(Stats));