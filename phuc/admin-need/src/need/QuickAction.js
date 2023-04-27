import React from 'react';
import $ from 'jquery';

class QuickAction extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div className="row div-card my-3">
            <div className="rounded-1 shadow-sm p-md-5 p-2">
                <h4>Quick action - is this needed?</h4>
                <p>Nothing is working in this box, what should be here?</p>
                <div className="">
                    <span className="mx-2">Current state: </span>
                    
                    <div className="btn-group">
                        <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Need review
                        </button>
                        <ul class="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Need review</a></li>
                            <li><a className="dropdown-item" href="#">Already reviewed</a></li>
                            <li><a className="dropdown-item" href="#">Waiting for help</a></li>
                            <li><a className="dropdown-item" href="#">Finished</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default QuickAction;