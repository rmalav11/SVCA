import React from 'react';
import $ from 'jquery';
import {Modal} from 'bootstrap';
import 'antd/dist/antd.css';
import { notification } from 'antd';

class WorkingEdit extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
        this.updateWorking = this.updateWorking.bind(this);
        this.deleteWorking = this.deleteWorking.bind(this);
        this.hideModal = this.hideModal.bind(this);
        
    }
    componentDidMount(){

    }

    hideModal(){
        $('body').removeClass('modal-open');
        
        $('.modal-backdrop').remove();
        $('body').removeAttr("data-bs-overflow");
        $('body').removeAttr("style");
    }

    deleteWorking(){
        let that = this;
        
        var myModal = Modal.getInstance(document.getElementById("working-edit-"+this.props.id),{});
        console.log(myModal);
        console.log("working-edit-"+this.props.id);
        // myModal.toggle();
        // $('.modal').modal('hide');
        
       
        $.ajax({
            type: 'DELETE',
            url: 'https://sv-communityadvocates.org/api/react/needs-working/'+that.props.id+'/',
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
                    description: "Agency's Entries deleted."
                })
                myModal.hide();
                that.hideModal();
            },
            
        })
    }
    updateWorking(event){
        var myModal = Modal.getInstance(document.getElementById("working-edit-"+this.props.id),{});

        event.preventDefault();
        let that = this;
        $.ajax({
            type: 'PATCH',
            url: 'https://sv-communityadvocates.org/api/react/needs-working/'+that.props.id+'/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            data: $("#working-edit-form"+that.props.id).serialize(),
            error: function(response){
                console.log(response);
                notification["error"]({
                    message: "Update failed",
                    description: "An error happened, please try again later."
                })
            },
            success: function(response){
                

                $("agency_edit_"+that.props.id).val(response['agency']);
                $("need_edit_"+that.props.id).val(response['need']);
                $("need_met_edit_"+that.props.id).val(response['need_met']);
                that.props.updateData();
                notification["success"]({
                    message: "Update successfully",
                    description: "Follow up information updated."
                })
                myModal.hide();
                that.hideModal();
            },
            
        })
        
    }


    render(){
        return(
            <div className="modal fade" id={"working-edit-"+this.props.id} data-bs-backdrop="static" tabIndex="-1" aria-labelledby="working-edit-label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Agency response edit</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="container-fluid">
                        <form id={"working-edit-form"+this.props.id} hidden onSubmit={this.updateWorking}>
                            {/* <input form="request-form" name="id" value={this.props.need_id}></input> */}
                        </form>
                            <div className="row">
                                <div className="col-sm">
                                    <label for={"agency_edit_"+this.props.id} class="form-label" >AGENCY/PERSON/ORG</label>
                                    <input form={"working-edit-form"+this.props.id} type="text" className="form-control" name="agency" id={"agency_edit_"+this.props.id} defaultValue={this.props.agency}></input>
                                </div>

                                <div className="col-sm">
                                    <label for={"need_edit_"+this.props.id} class="form-label">NEED</label>
                                    <input form={"working-edit-form"+this.props.id} type="text" className="form-control" name="need" id={"need_edit_"+this.props.id} defaultValue={this.props.need}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div>
                                    <label for={"need_met_edit_"+this.props.id} class="form-label">NEED MET</label>
                                    <textarea form={"working-edit-form"+this.props.id} className="form-control" name="need_met" id={"need_met_edit_"+this.props.id} defaultValue={this.props.need_met}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                   
                        <div className="modal-footer justify-content-between">
                            
                                <button type="button" className="btn btn-danger mr-auto" onClick={this.deleteWorking}>Delete</button>
                            <div>
                                <button type="button" className="btn btn-secondary m-1" onClick={this.resetData} data-bs-dismiss="modal">Close</button>
                                <button form={"working-edit-form"+this.props.id} type="submit" className="btn btn-primary m-1">Save changes</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WorkingEdit;