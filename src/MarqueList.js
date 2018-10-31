import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import Marque from './Marque.js';

class MarqueList extends Component {
    render(){
        return (<div className="marques">
            {
                this.props.fh4State.marques.map((marque)=>{
                    return <Marque key={marque} marque={marque} />
                })
            }
        </div>);
    }
}

export default inject("fh4State")(observer(MarqueList));