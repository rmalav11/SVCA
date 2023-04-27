import React from 'react';
import { getFollowUpId } from './getFollowUpId';
import 'antd/dist/antd.css';
import $ from 'jquery';
import {Modal} from 'bootstrap';
import { notification } from 'antd';


class FollowupEdit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            followup: null,
        }
        this.updateFollowup = this.updateFollowup.bind(this);
        this.resetData = this.resetData.bind(this);
        this.deleteFollowup = this.deleteFollowup.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    
    componentDidMount(){
        //get the Follow up information here
        // getFollowUpId(this.props.id, (response) => {
        //     this.setState({

        //     })
        // })
    }

    // this will reset the data display in the Modal back to orginal data
    resetData(){
        $("#worker_edit_"+this.props.id).val(this.props.worker);
        $("#date_edit_"+this.props.id).val(this.props.date);
        $("#notes_edit_"+this.props.id).val(this.props.note);
    }

    hideModal(){
        var myModal = Modal.getInstance(document.getElementById("followup-edit-"+this.props.id),{});
        myModal.hide();
        $('body').removeClass('modal-open');
        
        $('.modal-backdrop').remove();
        $('body').removeAttr("data-bs-overflow");
        $('body').removeAttr("style");
    }

    deleteFollowup(){
        let that = this;
        // myModal.toggle();
        // $('.modal').modal('hide');
        
       
        $.ajax({
            type: 'DELETE',
            url: 'https://sv-communityadvocates.org/api/react/need-follow-up/'+that.props.id+'/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            error: function(response){
                console.log(response);
                notification["error"]({
                    message: "Delete failed",
                    description: "An error happened, please try again later."
                })
            },
            success: function(response){
                that.props.updateData();
                notification["success"]({
                    message: "Delete successfully",
                    description: "Follow up deleted."
                })
                that.hideModal();
                
            },
        })
    }

    updateFollowup(event){
        event.preventDefault();
        let that = this;
        $.ajax({
            type: 'PATCH',
            url: 'https://sv-communityadvocates.org/api/react/need-follow-up/'+that.props.id+'/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            data: $('#followup-edit-form'+this.props.id).serialize(),
            error: function(response){
                console.log(response);
                notification["error"]({
                    message: "Update failed",
                    description: "An error happened, please try again later."
                })
            },
            success: function(response){
                $("#worker_edit_"+that.props.id).val(response['worker']);
                $("#date_edit_"+that.props.id).val(response['date']);
                $("#notes_edit_"+that.props.id).val(response['note']);
                that.props.updateData();
                notification["success"]({
                    message: "Update successfully",
                    description: "Follow up information updated."
                })
                that.hideModal();
                that.resetData();
            },
            
        })
        
    }

    render(){
        return (
        <div className="modal fade" id={"followup-edit-"+this.props.id} data-bs-backdrop="static" tabIndex="-1" aria-labelledby="followup-edit-label" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Follow up edit</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                    <div className="container-fluid">
                    <form id={"followup-edit-form"+this.props.id} hidden onSubmit={this.updateFollowup}>
                        {/* <input form="request-form" name="id" value={this.props.need_id}></input> */}
                    </form>
                        <div className="row">
                            <div className="col-sm">
                                <label for={"worker_edit"+this.props.id} class="form-label" >Worker</label>
                                <input form={"followup-edit-form"+this.props.id} type="text" className="form-control" name="worker" id={"worker_edit_"+this.props.id} defaultValue={this.props.worker}></input>
                            </div>

                            <div className="col-sm">
                                <label for={"date_edit_"+this.props.id} class="form-label">Date</label>
                                <input form={"followup-edit-form"+this.props.id} type="date" className="form-control" name="date" id={"date_edit_"+this.props.id} defaultValue={this.props.date}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div>
                                <label for={"notes_edit_"+this.props.id} class="form-label">Notes</label>
                                <textarea form={"followup-edit-form"+this.props.id} className="form-control" name="note" id={"notes_edit_"+this.props.id} defaultValue={this.props.note}></textarea>
                            </div>
                        </div>
                    </div>
                </div>


                

                <div className="modal-footer justify-content-between">
                    <button type="button" className="btn btn-danger mr-auto" onClick={this.deleteFollowup}>Delete</button>
                    <div>
                        <button type="button" className="btn btn-secondary m-1" onClick={this.resetData} data-bs-dismiss="modal">Close</button>
                        <button form={"followup-edit-form"+this.props.id} type="submit" className="btn btn-primary m-1">Save changes</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        )
    }
    

}
export default FollowupEdit;