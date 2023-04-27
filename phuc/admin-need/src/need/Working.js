import React from 'react';
import $ from 'jquery';
import { getWorking } from './getWorking';
import WorkingEdit from './popup/WorkingEdit';
import './css/working.css'

class Working extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            workData: props.workData,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    componentDidMount(){
        getWorking(this.props.need_id, (response) =>{
            console.log(response);
            this.setState({workData: response});
        })
    }
    updateData(){
        getWorking(this.props.need_id, (response) =>{
            this.setState({workData: response});
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target);
        
        let that = this; //save the current Working class to var 'that'
        $.ajax({
            type: 'POST',
            url: 'https://sv-communityadvocates.org/api/react/needs-working/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            data: $( '#working-form' ).serialize(),
            error: function(response){
                console.log(response);
            },
            success: function(response){
                console.log($( '#working-form' ).serialize())
                console.log("success start");
                event.target.reset();
                console.log(that.props)
                getWorking(that.props.need_id, (response) =>{
                    that.setState({workData: response});
                })
            },
            
        })
        }
    

    render(){
        return this.state.workData == null? (<div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>):(
        <div className="row div-card my-3">
            <div className="rounded-1 shadow-sm p-md-5 p-2 table-responsive">
                <h4 className="" style={{display: "inline"}}>AGENCIES, INDIVIDUALS WORKING ON NEEDS</h4>
                <table class="table table-hover custom-table ">
                    <thead>
                        <tr>
                            <th>AGENCY/PERSON/ORG</th>
                            <th>NEED</th>
                            <th>NEED MET</th>
                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(this.state.workData)}
                        {
                            
                            this.state.workData.map(work =>(
                                
                                <tr key={work.id}>
                                    <td>{work.agency}</td>
                                    <td>{work.need}</td>
                                    <td>{work.need_met}</td>
                                    <td><button type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target={"#working-edit-"+work.id}><i class="far fa-edit"></i></button></td>
                                    <td><WorkingEdit id={work.id} agency={work.agency} need={work.need} need_met={work.need_met} updateData={this.updateData}/></td>
                                </tr>
                            ))
                        }
                        <tr key={"edit-cell"}>
                            <td><div><input form="working-form" id="new_agency" className="form-control" name="agency" type="text" placeholder="new agency/person" required></input></div></td>
                            <td><div><input form="working-form" id="new_need" className="form-control" name="need" type="text" placeholder="need"></input></div></td>
                            <td colSpan="2"><div><textarea form="working-form" id="new_need_met" className="form-control" name="need_met" type="text" placeholder="need met" required></textarea></div></td>
                            
                        </tr>
                    </tbody>
                </table>
                <form id="working-form" hidden onSubmit={this.handleSubmit}>
                    <input form="working-form" name="response" value={this.props.need_id}></input>
                </form>
                <button form="working-form" type="submit" class="btn btn-outline-secondary float-end">Add new working</button>
            </div> 
        </div>
    )
    }
}

export default Working;