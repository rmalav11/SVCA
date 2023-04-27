import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Tabs, Form, Input, notification, Popconfirm } from 'antd';
import { Editor } from '@tinymce/tinymce-react'; 
import $ from 'jquery';


const { TabPane } = Tabs

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
                    'fullscreen quickbars save image'
                ],
                toolbar:
                    'undo redo cancel | formatselect | bold italic underline | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent image| code fullscreen |help',
                    
                toolbar_mode: 'floating',
                menubar: 'tool'
            }}
            onEditorChange={onChange}
        />
    )
}

const  TabContent = (props) => {

    const [form] = Form.useForm();
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const deleteInfo = () => {
        setDeleteLoading(true);
        $.ajax({
            type:'DELETE',
            url: 'https://sv-communityadvocates.org/api/homepage/siteinfo/'+props.info.id+'/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            error: function(response){
                console.log("error: ", response)
                notification["error"]({
                    message: 'An error happened',
                    description: 'The value is not updated, please try again'
                })
            },
            success: function(response){
                notification["success"]({
                    message: 'Value updated',
                    description: 'Information updated!'
                })
                
            },
            complete: function(){
                setDeleteLoading(false)
                if (props.updateCallback)
                    props.updateCallback();
            }
        })
    }

    const onEditorChange = (content, editor) => {
        // console.log('content:', content);
        // console.log('editor:', editor);
        form.setFieldsValue({'value': content.content});
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        setSubmitLoading(true);
        $.ajax({
            type:'PATCH',
            url: 'https://sv-communityadvocates.org/api/homepage/siteinfo/'+props.info.id+'/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            data: values,
            error: function(response){
                console.log("error: ", response)
                notification["error"]({
                    message: 'An error happened',
                    description: 'The value is not updated, please try again'
                })
            },
            success: function(response){
                notification["success"]({
                    message: 'Value updated',
                    description: 'Information updated!'
                })
                
            },
            complete: function() {
                setSubmitLoading(false)
                if (props.updateCallback)
                    props.updateCallback();
            }
        })
    }

    return (
        <div>
            <div className="container py-3">
                <Form name={"infoUpdate"+props.info.id} onFinish={onFinish} layout="vertical"
                    form={form}
                    initialValues={{
                        name:props.info.name,
                        value:props.info.value,
                        note:props.info.note
                    }}    
                >
                    <Form.Item
                        label="ID"           
                    >
                        <Input disabled value={props.info.id}/>
                    </Form.Item>
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

                    <Form.Item>
                        <Popconfirm placement="topLeft" onConfirm={deleteInfo} title="Delete this may cause some site to render differently, do you want to continue?" okText="Yes" >
                            <Button loading={deleteLoading} type="primary" danger>Delete?</Button>
                        </Popconfirm>
                        <Button  loading={submitLoading} style={{float:"right"}} type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
}

export default TabContent;