import React from 'react';
import Member from './Member';
import './memberrow.css';


class Memberrow extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return this.props.member == null? (<div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>):(
            
                <tr key={this.props.member.id} className="shadow-sm custom-row">
                    <td>{this.props.member.id}</td>
                    <td>{this.props.member.name}</td>
                    <td>{this.props.member.contact_name}</td>
                    <td>{this.props.member.phone}</td>
                    <td>{this.props.member.email}</td>
                    <td>{this.props.member.contact_type}</td>
                    <td>{this.props.member.location_type}</td>
                    <td>{this.props.member.member_type}</td>
                    <td>{this.props.member.accepted == 1? 
                        <div class="btn-group">
                            <button type="button" class="btn btn-success">Accepted</button>
                            <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><a class="dropdown-item" href="#">Separated link</a></li>
                            </ul>
                        </div>
                        :
                        <div class="btn-group">
                            <button type="button" class="btn btn-danger">Not accepted</button>
                            <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Separated link</a></li>
                            </ul>
                        </div>}</td>
                    <td><div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Actions
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Approve</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"></hr></li>
                        <li><a class="dropdown-item" href="#">Delete</a></li>
                    </ul>
                    </div>
                    </td>
                </tr>
            
        )
    }
}

export default Memberrow