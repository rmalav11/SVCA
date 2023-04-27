import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {getLogin} from '@whitworth/svca-website.utilities.login';
import { Layout, Menu,  } from 'antd';
import Sidebar from '@whitworth/svca-website.ui.sidebar';
import Navbar from '@whitworth/svca-website.ui.navbar';

import PostList from './components/postlist';
import './App.css';

const { Sider, Content } = Layout; 

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      username: null,
      firstname: null,
      collapsed: true,
      groups: [], 
    }
    getLogin((response) => {
        
      this.setState({
        username: response.username,
        firstname: response.firstname,
        groups: response.groups, 
      });
    });

  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return( 
    <div>
      <Layout>
        <Navbar siteName="SVCA" username={this.state.username}/>
        <Layout>
          <Sider theme="light" trigger={null} collapsible collapsed={this.state.collapsed}>
            <Sidebar permission_groups={this.state.groups} selected="3" collapsed={this.state.collapsed} toggle={() => this.toggle()}/>
          </Sider>
          
          <Layout className="site-layout" style={{background:"white"}}>
          <Content className="site-layout-background">
            <PostList/> 
          </Content>

          </Layout>
        </Layout>
      </Layout>
    </div>)
  }
}

export default App;
