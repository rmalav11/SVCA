import React from 'react';
import {listNeeds} from './need_function';
import Needrow from './Needrow';
import '../members/member.css';

class Need extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            needList: null,
        }
        
    }

    componentDidMount(){
        listNeeds((response) => {
            console.log(response);
            this.setState({memberList: response});
        })
    }

    render(){
        return this.state.memberList == null? (<div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>):(
            <div style={{ padding:30, overflowX: 'scroll', }}>
                <table class="table table-hover custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Contact Preference</th>
                            <th>Gender</th>
                            <th>Primary Language</th>
                            <th>Vulnerable?</th>
                            <th>Needs</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.memberList.map(need => (
                                //<tr key={member.id}>
                                //    <td>{member.id}</td>
                                //    <td>{member.name}</td>
                                //    <td>{member.contact_name}</td>
                                //    <td>{member.phone}</td>
                                //    <td>{member.email}</td>
                                //    <td>{member.contact_type}</td>
                                //    <td>{member.location_type}</td>
                                //    <td>{member.member_type}</td>
                                //    <td>{member.accepted}</td>
                                //    <td><button type="button" class="btn btn-primary">Primary</button></td>
                                //</tr>
                                <Needrow need={need}/>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}

export default Need;