import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Select, notification, Popconfirm, Checkbox } from 'antd'; 
import $ from 'jquery';

const { Option } = Select


function UserEdit(props) {

    const [ form ] = Form.useForm()

    const [sameEmail, setSameEmail] = useState(true);

    const emailReferenceChange = () => {
        if (!sameEmail)
            form.setFieldsValue({username: form.getFieldsValue().email})
        else
            form.setFieldsValue({username: props.record.username})
        setSameEmail(!sameEmail);

    }

    const deleteAccount = () => {
        $.ajax({
            type:'DELETE',
            url: 'https://sv-communityadvocates.org/api/react/users/'+props.record.id+'/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            error: function(response){
                console.log("error: ", response)
                notification["error"]({
                    message: 'An error happened',
                    description: props.record.username + '\'s account is not deleted, please try again.'
                })
                if (props.updateCallback)
                    props.updateCallback();
            },
            success: function(response){
                notification["success"]({
                    message: 'User deleted',
                    description: props.record.username + '\'s information has been deleted!'
                })
                if (props.updateCallback)
                    props.updateCallback();
            }
        })
    }

    const onFinish = (values) => {
        console.log("Succcess: ", values);
        console.log(typeof(values));
        $.ajax({
            type:'PATCH',
            url: 'https://sv-communityadvocates.org/api/react/users/'+props.record.id+'/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            data: JSON.stringify(values),
            contentType: 'application/json',
            error: function(response){
                console.log("error: ", response)
                notification["error"]({
                    message: 'An error happened',
                    description: props.record.username + '\'s information is not updated, please try again.'
                })
                if (props.updateCallback)
                    props.updateCallback();
            },
            success: function(response){
                notification["success"]({
                    message: 'User info updated',
                    description: props.record.username + '\'s information has been updated successfully!'
                })
                if (props.updateCallback)
                    props.updateCallback();
            }
        })
    }


    const permission_options = [
        <Option key="3" value={3}>Admin</Option>,
        <Option key="4" value={4}>Super user</Option>,
        <Option key="1" value={1}>Member</Option>,
        <Option key="2" value={2}>User</Option>,
        <Option key="5" value={5}>Site editor</Option>

    ]
    return (
        <div>
            <Form
                form={form}
                layout="horizontal"
                initialValues={{
                    username: props.record.username,
                    email: props.record.email,
                    first_name: props.record.first_name,
                    last_name: props.record.last_name,
                    groups: props.record.groups
                }}    
                onFinish={onFinish}
            >
                <Form.Item label="Username" name="username">
                    <Input placeholder="Username" disabled={sameEmail}/>
                </Form.Item>

                <Form.Item label="Email" name="email">
                    <Input type="email" placeholder="Email"/>
                </Form.Item>

                <Form.Item label="First name" name="first_name">
                    <Input placeholder="First name"/>
                </Form.Item>

                <Form.Item label="Last name" name="last_name">
                    <Input placeholder="Last name"/>
                </Form.Item>

                <Form.Item label="Permision groups" name="groups">
                    <Select 
                        mode="multiple"
                        allowClear
                        style={{ minWidth: '230px' }}
                        value={props.record.groups}
                        placeholder="Please select which permission group you want this user to be in"
                        // defaultValue={props.record.groups}
                    >{permission_options}</Select>
                </Form.Item>

                <Form.Item>
                    <Checkbox checked={sameEmail} onChange={() => emailReferenceChange()}>
                        Same username and password
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Update</Button>
                    <Popconfirm
                        placement="topRight"
                        title="This action cannot be undo, do you want to continue?"
                        okText="Yes"
                        onConfirm={deleteAccount}
                    >
                        <Button style={{float:"right"}} danger type="primary">Delete</Button>
                    </Popconfirm>
                    
                </Form.Item>

            </Form>
        </div>
    );
}

export default UserEdit;