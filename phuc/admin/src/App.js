import logo from './logo.svg';
import './App.css';
import Navbar from '@whitworth/svca-website.ui.navbar';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getLogin} from '@whitworth/svca-website.utilities.login';
import Member from './members/Member';
import Need from './needs/Need';
import {Layout} from 'antd';
import Sidebar from '@whitworth/svca-website.ui.sidebar';
 

const { Content, Sider } = Layout

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: null,
      firstname: null,
      groups: [], 
      collapsed: true,
    };
    getLogin((response) => {
      console.log(response);
      this.setState({
        username: response.username,
        firstname: response.first_name,
        groups: response.groups, 
      });
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  render(){
    return (
      <div className="App">
        <Layout style={{minHeight:"100vh"}}>
          <Navbar siteName = "SVCA" username={this.state.username}/>
          <Layout>
            <Sider theme="light" trigger={null} collapsible collapsed={this.state.collapsed}>
              <Sidebar permission_groups={this.state.groups} selected="1" collapsed={this.state.collapsed} toggle={() => this.toggle()}/>
            </Sider>

            <Layout className="site-layout" style={{background:"white"}}>
              <Content className="site-layout-background">
                <h1>Hello {this.state.firstname}</h1>
                <div className="container">
                  <div class="accordion accordion-flush" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                          Member list
                        </button>
                      </h2>
                      <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne">
                        <div class="accordion-body">
                        <Member/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container">
                  <div class="accordion accordion-flush" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNeed" aria-expanded="true" aria-controls="collapseNeed">
                          Needs list
                        </button>
                      </h2>
                      <div id="collapseNeed" class="accordion-collapse collapse show" aria-labelledby="headingOne">
                        <div class="accordion-body">
                        <Need/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
        {/* <CustomDrawer/> */}
        
      </div>
    );
  }
}

export default App;
