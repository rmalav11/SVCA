import React from 'react';
import '../members/memberrow.css'

class Needrow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return this.props.need == null? (<div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>):(
            
                <tr key={this.props.need.id} className="shadow-sm custom-row" onClick={"window.location='./need?id="+this.props.id+"';"}>
                    <td>{this.props.need.id}</td>
                    <td>{this.props.need.first_name}</td>
                    <td>{this.props.need.last_name}</td>
                    <td>{this.props.need.phone}</td>
                    <td>{this.props.need.email}</td>
                    <td>{this.props.need.contact_reference}</td>
                    <td>{this.props.need.gender}</td>
                    <td>{this.props.need.language}</td>
                    <td>{this.props.need.vulnerable_groups.length + " groups"}</td>
                    <td>{this.props.need.needs}</td>
                    <td>
                        <div class="btn-group">
                            <a class="btn btn-primary" href={"./need?id="+this.props.need.id} role="button">Detail</a>
                            <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
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
                    </td>
                </tr>
        )
    }
}

export default Needrow