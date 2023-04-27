

import 'antd/dist/antd.css';
import './App.css';
import {Form, Input, Button, notification, Modal} from 'antd';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import checkToken from './checkToken';

function getQueryVariable(variable)
{
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ] 
          if(pair[0] == variable){return pair[1];}
        }
        return(1);
}

function App() {
  const [form] = Form.useForm();
  const [token, setToken] = useState(null);


  const onFinish = (value) =>{
    console.log(value);
    $.ajax({
      type: 'POST',
      url: 'https://sv-communityadvocates.org/api/react/reset-password/confirm/',
      data: value,
      error:function(response){
          console.log(response);
          notification['error']({
              message: 'Password update failed',
              description: 'An error happened!'
          })
          
      },
      success: function(response){
          console.log(response);
          form.resetFields();
          notification.success({
              message: 'Password update successfully',
              description: 'Your password has beed update successfully'
          })
          Modal.success({
            content: "You password has been updated, you will now be redirected to the login page",
            onOk(){
              window.location.href = "/admin/login/";
            }
          })
      }
  })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    
    
    let tempToken = getQueryVariable('token')
    // console.log(token);
    checkToken(tempToken, (response) => {
        tempToken? form.setFieldsValue({'token':tempToken}) : form.setFieldsValue({'token':'-1'});
    }, (responseFail) => {

      Modal.error({
        title: 'Invalid token',
        content: 'The link seems to be broken, please request a new link.',
        onOk(){
          window.location.href = "/reset-password/";
        },
      });

    });
    setToken(getQueryVariable('token'));
  },[])

  return (
    
    <div className="container mainpage my-5">
      <h2 style={{textAlign:"center"}}>Reset password</h2>
      <div className="container">
        <Form
          className="form-part"
          style={{maxWidth: "720px"}}
          name="reset-password"
          form = {form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          initialValues={{
            password: '',
            confirm_password: '',
            token: '',
          }}
          >
            <Form.Item hidden={true} name="token">
              <input></input>
            </Form.Item>
            <Form.Item label="New password" name="password"
              help="Your password need to have at least 8 characters"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                  min:8,
                }
              ]}
            >
              <Input.Password/>
            </Form.Item>
            
            <Form.Item label="Confirm password" name="confirm_password"
              
              rules={[
                {
                    required: true,
                    message: "Please input your new password again!",
                    
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                      
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
            ]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item
                style={{float: 'right'}} 
                // wrapperCol={{
                // offset: 22,
                // // span: 4,
                // }}
            >
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>

        </Form>
        </div>
    </div>
  );
}

export default App;
