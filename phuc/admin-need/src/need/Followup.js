import React from 'react';
import $ from 'jquery';
import { getFollowUp } from './popup/getFollowUp';
import FollowupEdit from './popup/FollowupEdit';

class Followup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            followupData: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    componentDidMount(){
        getFollowUp(this.props.need_id, (response) =>{
            this.setState({followupData: response});
        })
    }
    updateData(){
        getFollowUp(this.props.need_id, (response) =>{
            this.setState({followupData: response});
        })
    }
    handleSubmit(event) {
        console.log("follow up handle")
        event.preventDefault();
        let that = this; //save the current Working class to var 'that'
        $.ajax({
            type: 'POST',
            url: 'https://sv-communityadvocates.org/api/react/need-follow-up/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            data: $('#followup-form').serialize(),
            error: function(response){
                console.log(response);
            },
            success: function(response){
                console.log($('#followup-form').serialize())
                
                getFollowUp(that.props.need_id, (response) =>{
                    that.setState({followupData: response});
                })
                event.target.reset();
            },
            
        })
        }

    render(){
        return this.state.followupData == null? (<div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>):(
        <div className="row div-card my-3">
            <div className="rounded-1 shadow-sm p-md-5 p-2 table-responsive">
                <h4 className="" style={{display: "inline"}}>FOLLOW-UP CASE NOTES</h4>
                <table class="table table-hover custom-table ">
                    <thead>
                        <tr>
                            <th>WORKER</th>
                            <th>DATE</th>
                            <th>NOTES</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(this.state.workData)}
                        {
                            
                            this.state.followupData.map(followup =>(
                                
                                <tr key={followup.id}>
                                    <td>{followup.worker}</td>
                                    <td>{followup.date}</td>
                                    <td>{followup.note}</td>
                                    <td><button type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target={"#followup-edit-"+followup.id}><i class="far fa-edit"></i></button></td>
                                    <td><FollowupEdit id={followup.id} worker={followup.worker} date={followup.date} note={followup.note} updateData={this.updateData}/></td>
                                </tr>
                            ))
                        }
                        <tr key={"edit-cell"}>
                            <td><div><input form="followup-form" id="new_worker" className="form-control" name="worker" type="text" placeholder="new worker" required></input></div></td>
                            <td><div><input form="followup-form" id="new_date" className="form-control" name="date" type="date" placeholder="date" required></input></div></td>
                            <td colSpan="2"><div><textarea form="followup-form" id="new_note" className="form-control" name="note" type="text" placeholder="note" required></textarea></div></td>
                        </tr>
                    </tbody>
                </table>
                
                <form id="followup-form" hidden onSubmit={this.handleSubmit}>
                    <input form="followup-form" name="response" value={this.props.need_id}></input>
                </form>
                <button form="followup-form" type="submit" class="btn btn-outline-secondary float-end">Add new followup</button>
            </div> 
        </div>
    )
    }
}

export default Followup;