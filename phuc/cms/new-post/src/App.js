import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {getLogin} from '@whitworth/svca-website.utilities.login';
import { Layout, Menu, PageHeader, notification  } from 'antd';
import Sidebar from '@whitworth/svca-website.ui.sidebar';
import Navbar from '@whitworth/svca-website.ui.navbar';


import './App.css';
import PostHeader from './components/postheader';
import PostBody from './components/postbody';
import PostEditor from './components/posteditor';
import { getPostInfo, getPostContent } from './tools/postFunction';

function getQueryVariable(variable)
{
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
          if(pair[0] == variable){return pair[1];}
        }
        return(null);
}

const { Sider, Content } = Layout; 

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      username: null,
      firstname: null,
      collapsed: true,
      groups: [], 
      showSetting: true,
      postData: null,
      contentData: null,
      postId: getQueryVariable('id'),
      saveState:{
        autoSave: true,
        state: 1 //0: saving, 1: saved, 2: modified but not saved
      },
      saveButtonFunc: null,
    }

    getLogin((response) => {
        
      this.setState({
        username: response.username,
        firstname: response.firstname,
        groups: response.groups, 
      });
    });
    // console.log(postId);
    
  }

  componentDidMount() {
    // if there's ID, try to get the information from that ID
    // If there's no ID or get the post information fail, start a new post instead
    if (this.state.postId === null){
      this.setState({
        contentData: [],
      });
      return;
    }
    getPostInfo(this.state.postId, (postData) =>{
      //successfully retrieve post meta data
      this.setState({
        postData: postData,
      });

      //try to the content of the post
      getPostContent(this.state.postId, (postContent) => {
        if (postContent.length > 0){
          this.setState({
            contentData: postContent, // get the last one for now?
          })
        } else {
          notification['info']({
            message: 'No post content found',
            description: "No post content found, if the post already has some content, try to reload the page?"
          });
          this.setState({
            contentData: [], // get the last one for now?
          })
        }
       
      }, (error) => {
        notification['error']({
          message: 'An error happened',
          description: "An error happened, please try again later."
        });
      })

    }, (errorInfo) => {
      notification['warning']({
        message: 'Creating new post',
        description: "You are currently creating a new post, if your intent was to edit a post, please go back and try again.",
        duration: 30,
      });

      // Delete the post state.postId
      this.setState({
        postId: null,
        postData: null,
      })
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  setPostData = (newData) => {
    this.setState({
      postData: newData,
    })
  }

  setContentData = (newData) => {
    this.setState({
      contentData: newData,
    })
  }

  setSaveState = (newState) => {
    this.setState({
      saveState: newState,
    })
  }
  setSaveButton = (func) =>{
    this.setState({
      saveButtonFunc: func
    })
  }

  toggleSetting = () =>{
    this.setState({
      showSetting: !this.state.showSetting,
    });
  };



  render() {
    return( 
    <div>
      <Layout>
        {/* <Navbar siteName="SVCA" username={this.state.username}/> */}
        <PostHeader toggleSetting={this.toggleSetting} postId={this.state.postId} 
          postData={this.state.postData} setPostData={this.setPostData}
          contentData={this.state.contentData} setContentData={this.setContentData}
          savePost={this.state.saveButtonFunc} 
          saveState={this.state.saveState} setSaveState={this.setSaveState}
        />
        <Layout> 
          
          <Layout className="site-layout" style={{background:"white"}}>
          <Content className="site-layout-background">
            <PostEditor showSetting={this.state.showSetting}
              postData={this.state.postData} setPostData={this.setPostData}
              contentData={this.state.contentData} setContentData={this.setContentData}
              saveState={this.state.saveState} setSaveButton={this.setSaveButton}
            />
            {/* <PostBody showSetting={this.state.showSetting} /> */}
          </Content>

          </Layout>
        </Layout>
      </Layout>
    </div>)
  }
}

export default App;
