import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, notification } from 'antd';
import './App.css';
import $ from 'jquery';
import 'platform'
import platform from 'platform';
import ReCAPTCHA from 'react-google-recaptcha';
import {getParameterByName, getRedirect, checkLogin} from './tool';

function App(props) {
  const recaptchaRef = React.useRef();
  

  const onFinish = async (values) => {
    values.token = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();
    // console.log
    console.log("Success: ", values);
    $.ajax({
      type: 'POST',
      url: 'https://sv-communityadvocates.org/api/react/login/',
      data: values,
      error: function(response){
          console.log("Error:",response);
          notification["error"]({
            message: 'Login failed',
            description:
              'Please check your password and email again',
          });
      },
      success: function(response){
        
          if (response.status == 1){
              console.log("Success!");
              
              localStorage.setItem('token', response.token);
              notification["success"]({
                message: 'Login success',
                description:
                  'Login successfully!',
              });

              if (getParameterByName('redirect')){
                  window.location.replace(getRedirect());
              } else {
                window.location.replace("/admin/profile/");
              }
          }
          
          
      }
  });
  }
  const onFinishFailed = (error) =>{
    console.log("failed: ", error);
  }

  useEffect(() =>{
    checkLogin();
  },[])
  return (
    <div>
      <div className="container login-div ">
        <h2 className="text-center pb-4">User login</h2>
        <Form
          name="login"
          layout="vertical"
          initialValues={{
            device: platform.description
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message:'Please inut your username!',
              },
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message:'Please inut your password!',
              },
            ]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item
            hidden
            name="device"
          >
           <input></input>
          </Form.Item>
        
        <Form.Item
          // wrapperCol={{
          //   offset: 8,
          //   span: 16,
          // }}
        >
          <Button type="primary" htmlType="submit" style={{float:"right"}}>
            Submit
          </Button>
        </Form.Item>

        <Form.Item>
          <p style={{float:"right", fontSize:"large"}}>or <a href="/signup/">create an account</a></p>
        </Form.Item>

        </Form>  

        <ReCAPTCHA ref={recaptchaRef} sitekey="6Lc_7pMbAAAAAJRcdqCiTkI16SR6MwRUKqsHFR9P" size="invisible"/>
      </div>
    </div>
  );
}

export default App;