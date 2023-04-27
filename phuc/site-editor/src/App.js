import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { getLogin } from '@whitworth/svca-website.utilities.login';
import { Col, Layout, Row } from 'antd';
// import Sidebar from './components/sidebar';
import Sidebar from '@whitworth/svca-website.ui.sidebar';
import Navbar from '@whitworth/svca-website.ui.navbar';
// import { Content, Sider } from 'antd/lib/layout/layout';
import EditContent from './EditContent';
import './App.css';
import bootstrap from 'bootstrap';
   
const { Content, Sider } = Layout

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      groups: [],
      username: '',
      firstname: '',
      id:-1,
      collapsed: true,
    };

    getLogin((response) => {
      this.setState({
        id: response.id,
        username: response.username,
        firstname: response.first_name,
        groups: response.groups,    
      });
    })
  }

  sideBarTrigger = () =>{
    this.setState({collapsed: !this.state.collapsed})
  }

  render() {
    return (
      <div>
        <Layout style={{height:'100vh', }}>
          <Navbar siteName="svca" username={this.state.username}/>
          <Layout>
            <Sider theme="light" trigger={null} collapsible collapsed={this.state.collapsed}>
              <Sidebar permission_groups={this.state.groups} selected="4" collapsed={this.state.collapsed} toggle={() => this.sideBarTrigger()}/>
            </Sider>

            <Layout className="site-layout" style={{background:"white"}}>
              <Content className="site-layout-background">
                <EditContent/>

              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}


export default App;