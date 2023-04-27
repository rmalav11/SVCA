import React from 'react';
import {getNeed} from './getNeed';
import { getWorking } from './getWorking';
import Working from './Working';
//import Need from './Need';
import './need.css'
import Followup from './Followup';
import Information from './Information';
import Assessment from './Assessment';
import QuickAction from './QuickAction';

class Need extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            need: null,
            working: null
        }
    }



    render(){
        return (
        <div className="container" style={{textAlign: "left"}}>
            <QuickAction/>
            <h3>Information</h3>
            
            <Information need_id={this.props.need_id}/>
            

            <hr class="dropdown-divider"></hr>
            <h4>SVCA - currently logged in as {this.props.username}</h4>

            <Assessment need_id={this.props.need_id}/>

            <Working workData={this.state.working} need_id={this.props.need_id}/>
            <Followup need_id={this.props.need_id}/>
        </div>
        )
    }
}

export default Need;