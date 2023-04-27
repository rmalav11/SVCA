import 'antd/dist/antd.css';
import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import './App.css';
import ReCAPTCHA from 'react-google-recaptcha';
import $ from 'jquery';

function App() {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const recaptchaRef = React.useRef();

  const onFinish = async (values) =>{
    console.log("Form values: ", values);
    // console.log("captcha value: ", recaptchaRef.current.execute())
    values.token = await recaptchaRef.current.executeAsync();
    console.log(values);
    recaptchaRef.current.reset();
    $.ajax({
      type: 'POST',
      url: 'https://sv-communityadvocates.org/api/react/signup/',
      data: values,
      error: function(response){
        console.log('Error:', response);
        notification['error']({
          message: 'Sign up failed',
          description: response.responseJSON.detail,
        });
        
      },
      success: function(response){
        notification['success']({
          message: "Sign up successfully",
          description: "You have successfully sign up your account",
        });

        // redirect to profile page?
        window.location.href = "/admin/profile/"
      }
    })
  }
  return (
    <div>
      <div className="container login-div">
        <h2 className="text-center pb-4">User signup</h2>
        <Form
          {...formItemLayout}
          onFinish={onFinish}
        >
          <Form.Item
            name="first_name"
            label="First name"
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
              },
            ]}
            
          >
            <Input/>
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Last name"
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
            ]}
            
          >
            <Input/>
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[
            {
              type:'email',
              message: 'The input is not a valid Email',
            },
            {
              required: true,
              message: 'Please input your email'
            }
          ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
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
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{span:24}}>
            <p style={{float:"right"}}>Already have an account? <a href="/admin/login/">sign in</a> instead</p>
          </Form.Item>

          <Form.Item wrapperCol={{span:24}}>
            <Button type="primary" htmlType="submit" style={{float:'right'}}>
              Register
            </Button>
          </Form.Item>

          

          <ReCAPTCHA ref={recaptchaRef} sitekey="6Lc_7pMbAAAAAJRcdqCiTkI16SR6MwRUKqsHFR9P" size="invisible"/>
      
        </Form>
      </div>
    </div>
  );
}

export default App;
