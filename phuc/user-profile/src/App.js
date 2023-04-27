import React from 'react'; 
import Navbar from '@whitworth/svca-website.ui.navbar';
import './App.css';
import 'antd/dist/antd.css';
import { getLogin } from '@whitworth/svca-website.utilities.login';
import { Layout, Menu } from 'antd';
import AccountInfo from './AccountInfo';
import DeviceList from './DeviceList';
import ChangePassword from './ChangePassword';
import $ from 'jquery';
import Sidebar from '@whitworth/svca-website.ui.sidebar';
// import Sidebar from './Sidebar';

import {
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  UploadOutlined,
  BarsOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: null,
      collapsed: true,
      isSuperUser: false,
      groups: [],
    };

    


    getLogin((response) => {
      console.log(response);
      this.setState({
        username: response.username,
        firstname: response.first_name,
        groups: response.groups,   
      });
    })

    this.checkPermission("is_super_user", (response) => {
      this.setState({isSuperUser: true});
    }, (response) => {
      this.setState({isSuperUser: false});
    })
    this.toggle = this.toggle.bind(this);
    this.checkPermission = this.checkPermission.bind(this);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  checkPermission = (perm, successcallback, failcallback) => {
    $.ajax({
      type: "POST",
      url: 'https://sv-communityadvocates.org/api/react/check-permission/',
      headers: {
        'Authorization': 'token ' + localStorage.token
      },
      data:{
        'permission': perm,
      },
      error: function(response) {
        if (failcallback) 
          failcallback(response);
      },
      success: function(response){
        if (successcallback)
          successcallback(response);
      }
    });
  }


  render(){
    return(
      <div>
        <Layout>
          <Navbar siteName="SVCA" username={this.state.username}/>
          <Layout>
            <Sider theme="light" trigger={null} collapsible collapsed={this.state.collapsed}>
              <Sidebar permission_groups={this.state.groups} selected="2" collapsed={this.state.collapsed} toggle={() => this.toggle()}/>
            </Sider>

            <Layout className="site-layout" style={{background:"white"}}>
              <Content className="site-layout-background">
                <div className="container">
                  <h1>My Account</h1>
                
                  <AccountInfo/>
                  <ChangePassword/>
                  <DeviceList/>
                </div>
              </Content>
            </Layout>
          </Layout>
          
        </Layout>
      </div>
    )
  }
}

export default App;