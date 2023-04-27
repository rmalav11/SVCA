import React from 'react';
import {getNeed} from './getNeed';
import $ from 'jquery';
import {notification} from 'antd';

class Information extends React.Component{
    constructor(props){
        super(props);
        this.state={
            need: null,
            textValue:null,
            readonly: true,
            personaledit: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.editButton = this.editButton.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.personalEditButton = this.personalEditButton.bind(this);
    }

    componentDidMount(){
        getNeed(this.props.need_id, (response) =>{
            console.log(response);
            this.setState({need: response});
            this.setState({textValue: response['needs']})
        });
    }

    
    handleChange(event){
        this.setState({textValue:event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        let that = this; //save the current Working class to var 'that'
        $.ajax({
            type: 'PATCH',
            url: 'https://sv-communityadvocates.org/api/react/needs/'+that.props.need_id+'/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            data: $('#request-form').serialize(),
            error: function(response){
                console.log(response);
                notification['error']({
                    message: 'Update request failed',
                    description:
                        'An error has happened, please try again later',
                });
            },
            success: function(response){
                notification['success']({
                    message: 'Update request successfully',
                    description:
                        'The request infromation has been updated successfully.',
                });
                that.setState({readonly:true});
                getNeed(that.props.need_id, (response) =>{
                    console.log(response);
                    that.setState({need: response});
                    that.setState({textValue: response['needs']})
                })
            },
            
        })
    }

    editButton(event){
        this.setState({readonly: !this.state.readonly});
    }
    personalEditButton(event){
        //this.setState({personaledit: !this.state.personaledit});

    }

    render(){
        return this.state.need ==null? (<div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>):(
        <div>
            <div className="row div-card my-3">
                <div className="rounded-1 shadow-sm p-md-5 p-2">
                <h4 className="" style={{display: "inline"}}>Personal information</h4>
                <a type="button" class="btn btn-outline-secondary float-end" href={"./edit-info/?id="+this.state.need.id}>Edit</a>
                    <div className="custom-div-table container">
                        {/* https://stackoverflow.com/questions/21001803/how-to-have-one-html-table-split-into-two-sections-side-by-side */}
                        <table className="table custom-table">
                            <tbody>
                                <tr key="id">
                                    <td>ID</td>
                                    <td id="personal_id" contentEditable={this.state.personaledit}>{this.state.need.id}</td>
                                </tr>
                                <tr key="first name">
                                    <td>FIRST NAME</td>
                                    <td id="personal_first_name" contentEditable={this.state.personaledit}>{this.state.need.first_name}</td>
                                </tr>
                                <tr key="last_name">
                                    <td>LAST NAME</td>
                                    <td id="personal_last_name" contentEditable={this.state.personaledit}>{this.state.need.last_name}</td>
                                </tr>
                                <tr key="address">
                                    <td>ADDRESS</td>
                                    <td id="personal_address" contentEditable={this.state.personaledit}>{this.state.need.address}</td>
                                </tr>
                                <tr key="phone">
                                    <td>PHONE</td>
                                    <td id="personal_phone" contentEditable={this.state.personaledit}>{this.state.need.phone}</td>
                                </tr>
                                <tr key="email">
                                    <td>EMAIL</td>
                                    <td id="personal_email" contentEditable={this.state.personaledit}>{this.state.need.email}</td>
                                </tr>
                                <tr key="ethnicity">
                                    <td>ETHNICITY</td>
                                    <td id="personal_ethnicity" contentEditable={this.state.personaledit}>{this.state.need.ethnicity}</td>
                                </tr>
                                <tr key="language">
                                    <td>LANGUAGE</td>
                                    <td id="personal_language" contentEditable={this.state.personaledit}>{this.state.need.language}</td>
                                </tr>
                                <tr key="gender">
                                    <td>GENDER</td>
                                    <td id="personal_gender" contentEditable={this.state.personaledit}>{this.state.need.gender}</td>
                                </tr>
                                <tr key="vulnerable_group">
                                    <td>VULNERABLE GROUP</td>
                                    <td id="personal_group" contentEditable={this.state.personaledit}>{
                                        this.state.need.vulnerable_groups.map(vulnerable => (
                                            <span class="badge bg-secondary mx-1">{vulnerable}</span>
                                        ))
                                    }</td>
                                </tr>
                                <tr key="family-composition">
                                    <td>Family something</td>
                                    <td>0-18: {this.state.need.family18}, 18-55: {this.state.need.family19}, 55+: {this.state.need.family55}</td>
                                </tr>
                                <tr key="NONE">
                                    <td>Place holder</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> 
            </div>

            <div className="row div-card my-3">
                <div className="rounded-1 shadow-sm p-md-5 p-2">
                <h4 className="" style={{display: "inline"}}>Requests, problems, needs</h4>
                <button type="button" class="btn btn-outline-secondary float-end" onClick={this.editButton}>Edit</button>
                <textarea form="request-form" name="needs" className="form-control my-4" rows={7} value={this.state.textValue} readOnly={this.state.readonly} onChange={this.handleChange}></textarea>
                <form id="request-form" hidden onSubmit={this.handleSubmit}>
                    <input form="request-form" name="id" value={this.props.need_id}></input>
                </form>
                <button form="request-form" hidden={this.state.readonly} type="submit" class="btn btn-outline-secondary float-end">Update assessment</button>
                </div> 
            </div>
        </div>

    )
    }
}

export default Information;