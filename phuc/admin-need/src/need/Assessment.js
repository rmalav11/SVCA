import React from 'react';
import $ from 'jquery';
import { getAssessment } from './getAssessment';
import 'antd/dist/antd.css';
import {notification} from 'antd';

class Assessment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            assessment: null,
            existed: false,
            readonly: true,
            textValue:null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createAssessment = this.createAssessment.bind(this);
        this.patchAssessment = this.patchAssessment.bind(this);
        this.handleEdit = this.handleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        getAssessment(this.props.need_id, (response) => {
            console.log(response.length);
            if (response.length > 0) {
                this.setState({assessment: response[0],
                                existed:true,
                                textValue:response[0]['assessment']});
            }else{
                this.setState({assessment: {"assessment":null,
                                            "author":null,
                                            "date":null,
                                            "id":null,
                                            "response":null},
                                existed:false});
            }
        }, (response) =>{
            notification['error']({
                message: 'Get Assesment Fail',
                description:
                  'An error has happened!',
              });
        })
    }
    handleChange(event){
        this.setState({textValue:event.target.value});
    }

    handleSubmit(event){
        this.state.existed? this.patchAssessment(event):this.createAssessment(event)
    }
    patchAssessment(event){
        console.log("Assessment handle")
        event.preventDefault();
        let that = this; //save the current Working class to var 'that'
        $.ajax({
            type: 'PATCH',
            url: 'https://sv-communityadvocates.org/api/react/need-assessment/'+this.state.assessment.id+'/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            data: $('#assess-form').serialize(),
            error: function(response){
                console.log(response);
                notification['error']({
                    message: 'Update assessment failed',
                    description:
                        'Assesment update failed, please try again later.',
                });
            },
            success: function(response){
                that.setState({readonly:true});
                notification['success']({
                    message: 'Update assessment successfully',
                    description:
                        'The assessment has been updated successfully.',
                });
                getAssessment(that.props.need_id, (response) =>{
                    if (response.length > 0) {
                        that.setState({assessment: response[0],
                                        existed:true,
                                        textValue:response[0]['assessment']});
                    }else{
                        that.setState({assessment: {"assessment":null,
                                                    "author":null,
                                                    "date":null,
                                                    "id":null,
                                                    "response":null},
                                        existed:false});
                    }
                })
            },
            
        })
    }
    createAssessment(event) {
        console.log("Assessment handle")
        event.preventDefault();
        let that = this; //save the current Working class to var 'that'
        $.ajax({
            type: 'POST',
            url: 'https://sv-communityadvocates.org/api/react/need-assessment/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            data: $('#assess-form').serialize(),
            error: function(response){
                console.log(response);
                notification['error']({
                    message: 'Update assessment failed',
                    description:
                        'Assesment update failed, please try again later.',
                });
            },
            success: function(response){

                notification['success']({
                    message: 'Update assessment successfully',
                    description:
                        'The assessment has been updated successfully.',
                });
                that.setState({readonly:true});

                getAssessment(that.props.need_id, (response) =>{
                    if (response.length > 0) {
                        that.setState({assessment: response[0],
                                        existed:true,
                                        textValue:response[0]['assessment']});
                    }else{
                        that.setState({assessment: {"assessment":null,
                                                    "author":null,
                                                    "date":null,
                                                    "id":null,
                                                    "response":null},
                                        existed:false});
                    }
                })
            },
            
        })
    }

    handleEdit(){
        console.log("handle edit");
        this.setState({
            "readonly": !this.state.readonly,
        }) 
    }
        
    
    render(){
        return this.state.assessment == null? (<div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>):(
        <div className="row div-card my-3">
            <div className="rounded-1 shadow-sm p-md-5 p-2">
            <h4 className="" style={{display: "inline"}}>ASSESSMENT OF LIFE CIRCUMSTANCES</h4>
            <button type="button" class="btn btn-outline-secondary float-end" onClick={this.handleEdit}>Edit</button>
            <textarea form="assess-form" name="assessment" className="form-control my-4" rows={7} readOnly={this.state.readonly} value={this.state.textValue} onChange={this.handleChange}></textarea>
            <form id="assess-form" hidden onSubmit={this.handleSubmit}>
                    <input form="assess-form" name="response" value={this.props.need_id}></input>
            </form>
            <button form="assess-form" hidden={this.state.readonly} type="submit" class="btn btn-outline-secondary float-end">Update assessment</button>
            </div> 
        </div>
    )
    }


}
export default Assessment;