import React, {useState} from 'react';
import { listMembers } from './member_function';
import { DataGrid } from '@material-ui/data-grid';
import Memberrow from './Memberrow';
import './member.css'
//https://i.stack.imgur.com/tseYw.png
const columns = [
    {field: 'id', headerName: 'ID', width:70},
    {field: 'name', headerName:'Name', width: 130},
    {field: 'contact_name', headerName:'Contact Name', width: 130},
    {field: 'phone', headerName:'Phone', width: 130},
    {field: 'email', headerName:'Email'},
    {field: 'contact_type', headerName:'Contact Type'},
    {field: 'location_type', headerName:'Location Type'},
    {field: 'member_type', headerName:'Member Type'},
    {field: 'accepted', headerName:'Accepted'},

]

class Member extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            memberList: null,
        }
        
    }
    componentDidMount(){
        listMembers((response) => {
            console.log(response);
            this.setState({memberList: response});
        })
    }
    model(){
        return (<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>)
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
                            <th>Name</th>
                            <th>Contact Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Contact Type</th>
                            <th>Location Type</th>
                            <th>Member Type</th>
                            <th>Accepted</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.memberList.map(member => (
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
                                <Memberrow member={member}/>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}

export default Member;