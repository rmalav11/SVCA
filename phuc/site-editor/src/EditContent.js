import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Card, Tabs, notification, Form } from 'antd';
import './EditContent.css';

import axios from 'axios';
import TabContent from './TabContent';
import { RiInformationFill } from 'react-icons/ri';
import Modal from 'antd/lib/modal/Modal';
import AddContent from './AddContent';

const { TabPane } = Tabs

class EditContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            siteInfo: [],
            modalVisible: false
        }

        
        

    }

    componentDidMount(){
        this.listSiteInfo();
    }

    showModal = () =>{
        this.setState({modalVisible: true});
    }

    toggleModal = (visibleState) => {
        this.setState({modalVisible: visibleState});
    }

    listSiteInfo = () => {
        let that = this
        axios.get('https://sv-communityadvocates.org/api/homepage/siteinfo/')
            .then(function (response){
                console.log(response.data);
                that.setState({siteInfo: response.data})
            })
            .catch(function (error){
                console.log(error)
                notification['error']({
                    message: 'Unable to retrieve site information',
                    description: 'Retrieving site information fail, please try again later.'
                })
            })
    }

    OperationSlot = {
        left: <Button type="" onClick={this.showModal}>Add new value</Button>,
    }

    render() {
        return (
            <div style={{height:"100%"}}>
                    <Tabs style={{height:"100%",}} tabPosition="left" tabBarStyle={{maxWidth:"20%", }} tabBarExtraContent={this.OperationSlot}>
                        {
                            this.state.siteInfo.map(info => (
                                <TabPane tab={info.name} key={info.id}>
                                    <TabContent style ={{overflow:"scroll"}} info={info} updateCallback={this.listSiteInfo}/>
                                    
                                </TabPane>
                            ))
                        }
                    </Tabs>
                <AddContent updateCallback={this.listSiteInfo} toggleModal={this.toggleModal} modalVisible={this.state.modalVisible}/>
            </div>
        );
    }
}


export default EditContent;