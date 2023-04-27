import React, { useState } from 'react';
import { Form, Modal, Info, Input, notification, Button } from 'antd';
import $ from 'jquery';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react'; 
// import CustomEditor from './CustomEditor';

const CustomEditor = ({value = {}, onChange}) =>{

    return (
        <Editor
            apiKey="ekx49rg8patd3ort2jen572huxv5fe0fktznizmz6977tan0"
            value={value}
            init={{
                height: 500,
                plugins: [
                    'advlist autolink lists link image', 
                    'charmap print preview anchor help',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste wordcount',
                    'fullscreen quickbars save'
                ],
                toolbar:
                    'undo redo cancel | formatselect | bold italic underline | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | code fullscreen |help',
                    
                toolbar_mode: 'sliding',

                menubar: 'tool'
            }}
            onEditorChange={onChange}
        />
    )
}

const AddContent = (props) => {

    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [customEditorShow, setEditorShow] = useState(false);

    const handleCancel = () =>{
        form.resetFields();
        props.toggleModal(false);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        setConfirmLoading(true);
        axios({
            method: 'POST',
            url: 'https://sv-communityadvocates.org/api/homepage/siteinfo/',
            headers: {
                Authorization: 'token ' + localStorage.token
            },
            data:values,
        }).then( function (response) {
            notification["success"]({
                message: 'Value added',
                description: 'New value added!'
            });
            form.resetFields();
            props.toggleModal(false);
        }).catch( function (response) {
            notification["error"]({
                message: 'An error happened',
                description: 'No value added'
            });
        }).then( function(response) {
            if (props.updateCallback){
                props.updateCallback();
            }
            setConfirmLoading(false);
        })
    }
    return (
        <div>
            <Modal
                title="Add new site's settings"
                visible={props.modalVisible}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" htmlType="submit" form="addInfo" loading={confirmLoading}>
                            Submit
                    </Button>,
                ]}
            >
                <Form name="addInfo" onFinish={onFinish} layout="vertical" form={form}
                    initialValues={{
                        name:'',
                        value:'',
                        note:''
                    }}    
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                            required: true,
                            message: 'Please input name of the value!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Note"
                        name="note"
                    >
                        <Input placeholder="Where would this value be used at?"></Input>
                    </Form.Item>

                    <Form.Item
                        label="Value"
                        name="value"
                        shouldUpdate
                        rules={[
                            {
                              required: true,
                              message: 'Please provide the value!',
                            },
                        ]}
                    >
                        {/* <Input.TextArea autoSize={{minRows:5}}/> */}
                        <CustomEditor/>
                        
                    </Form.Item>

                    {/* <Form.Item>
                        <Button onClick={() => {setEditorShow(true);}}>Show edit</Button>
                    </Form.Item> */}

                </Form>
            </Modal>
        </div>
    );
}

export default AddContent;