import 'antd/dist/antd.css';
import { Divider,Form, Input, Button, notification, Checkbox} from 'antd';
import $ from 'jquery';
import { logoutAll } from './tools.js/logouyAll';

function ChangePassword(props) {
    const [form] = Form.useForm();

    const onFinish= (values) => {
        
        console.log(values);
        $.ajax({
            type: 'PATCH',
            url: 'https://sv-communityadvocates.org/api/react/change-password/',
            data: values,
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            error:function(response){
                console.log(response);
                notification['error']({
                    message: 'Password update failed',
                    description: 'An error happened: ' + response.responseJSON.detail
                })
            },
            success: function(response){
                console.log(response);
                form.resetFields();
                notification.success({
                    message: 'Password update successfully',
                    description: 'Your password has beed update successfully'
                });
                if (values.signout){
                    //sign out of all  other devices
                    logoutAll((response2) =>{
                        notification.success({
                            message: 'All device logged out successfully',
                            description: 'All other devices have been logged out successfully'
                        });
                    });
                }
            }
        })
    }
    const onFinishFailed = (err) =>{
        console.log(err);
    }
    return (
        <div className="container">
            <div className="container-md rounded-3 p-3 m-3">
                <Divider orientation="left"><h2>Change password</h2></Divider>
              
                {/* <hr></hr> */}

                <Form name="passwordChange"
                layout="vertical"
                form={form}
                // labelCol={{
                //     span: 8,
                // }}
                // wrapperCol={{
                //     span: 16,
                // }}
                initialValues={{
                    old_password: '',
                    new_password: '',
                    repeat_new_password: '',
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                    <Form.Item label="Old password"
                    name="old_password"
                    rules={[
                        {
                            required: true,
                            message: "Please inpupt your old password!",
                        },
                    ]}>
                        <input type="password" className="form-control"></input>
                    </Form.Item>

                    <Form.Item label="New password"
                    name="new_password"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please inpupt your new password!",
                        },
                    ]}>
                        <input type="password" className="form-control"></input>
                    </Form.Item>
                        
                    <Form.Item label="Confirm new password"
                    name="repeat_new_password"
                    dependencies={["new_password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please input your new password again!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('new_password') === value) {
                                    return Promise.resolve();
                                }
                              
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}>
                        <input type="password" className="form-control"></input>
                    </Form.Item>

                    <Form.Item name="signout" valuePropName="checked">
                        <Checkbox>Sign out all other devices</Checkbox>
                    </Form.Item>

                    <Form.Item
                        style={{float: 'right'}} 
                        // wrapperCol={{
                        // offset: 22,
                        // // span: 4,
                        // }}
                    >
                        <button className="btn btn-primary" type="submit">
                        Submit
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ChangePassword;