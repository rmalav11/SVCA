import logo from './logo.svg';
import './App.css';
import React from 'react';
import {getLogin} from '@whitworth/svca-website.utilities.login';
import Sidebar from '@whitworth/svca-website.ui.sidebar';
import Navbar from '@whitworth/svca-website.ui.navbar';
import Need from './need/Need';
import { Layout, Menu, Breadcrumb } from 'antd';

import {
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarsOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;


function getQueryVariable(variable)
{
        var query = window.location.search.substring(1);
        console.log(query)//"app=article&act=news_content&aid=160990"
        var vars = query.split("&");
        console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
        for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ] 
          if(pair[0] == variable){return pair[1];}
        }
        return(1);
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      groups: [],
      username: '',
      firstname: '',
      id:-1,
      collapsed: true,
    };
    getLogin((response) => {
      console.log(response);
      this.setState({
        id: response.id,
        username: response.username,
        firstname: response.first_name,
        groups: response.groups,
      });
    });
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render(){
    return (
      <div className="App">
        <Layout>
          <Navbar siteName = "SVCA" username={this.state.username}/>
          <Layout>
          <Sider theme="light" trigger={null} collapsible collapsed={this.state.collapsed}>
              <Sidebar permission_groups={this.state.groups} selected={[]} collapsed={this.state.collapsed} toggle={() => this.toggle()}/>
          </Sider>
          
            <Layout className="site-layout" style={{backgroundColor: "#f8f8f8"}}>
              <Breadcrumb className="ms-4">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><a href="/admin/dashboard/">Dashboard</a></Breadcrumb.Item>
                <Breadcrumb.Item>Needs detail</Breadcrumb.Item>
              </Breadcrumb>
              <div className="limited-width">
                <h1 style={{textAlign: "center"}}>Need detail</h1>
                <Need need_id={getQueryVariable('id')} username={this.state.username}/>
              </div>
            </Layout>
          </Layout>
        </Layout>
        
      </div>
      
    );
  }
}

export default App;
