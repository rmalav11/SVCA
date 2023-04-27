import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { PageHeader, Collapse, Form, Input, Button, Select, notification } from 'antd';
import { createPostContent, createPostInfo, updatePostInfo } from '../../tools/postFunction';


const { Panel } = Collapse;
const { Option } = Select;


const PostSetting = (props) => {

    const [titleForm] = Form.useForm();
    const [urlForm] = Form.useForm();
    const onFinish = (values) =>{
        // create shallow copy of the post data
        let postDataCopy = Object.assign({},props.postData);
        // props.setPostData(Object.assign(postDataCopy, values));

        //check if there's an id? if there's then update based on that id, if not then create a new one
        if (props.postData && props.postData.id != null){
            // send the post data to the server
            updatePostInfo(props.postData.id, values, (response) => {
                props.setPostData(Object.assign(postDataCopy, response));
            }, (error) => {
                console.log(error);
                notification['error']({
                    message:"Something went wrong.",
                    description: "An error has occured, please try again."
                })
            })
        } else {
            createPostInfo(values, (response) => {
                props.setPostData(Object.assign(postDataCopy, response));
                // update the url to point to the new post
                window.history.replaceState({}, "", "?id="+response.id)
            }, (error) => {
                console.log(error);
                notification['error']({
                    message:"Something went wrong.",
                    description: "An error has occured, please try again."
                })
            })
        }
        
        
    }

    useEffect(() => {
        if (props.postData !== null){
            // console.log(props.postData);
            titleForm.setFieldsValue(props.postData);
            urlForm.setFieldsValue(props.postData);
        }
        
    }, [props.postData])
    

    return (
        <div>
            <PageHeader style={{borderBottom:"1px solid #e0e0e0"}} title="Setting" />
            <Collapse expandIconPosition="right" defaultActiveKey={["1","2"]}>
                <Panel key="1" header={<b>Title and visibility</b>}>
                    <Form name="title-visible-form" layout="vertical" onFinish={onFinish} form={titleForm} initialValues={{'public': false}}>
                        <Form.Item
                        label="Post title"
                        name="title"
                        rules={[
                            {
                              required: true,
                            },
                        ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                        label="Summary"
                        name="summary"
                        rules={[
                            {
                              required: false,
                            },
                        ]}
                        >
                            <Input.TextArea/>
                        </Form.Item>

                        <Form.Item label="Visibility" name="public" rules={[
                            {
                              required: true,
                            },
                        ]}>
                            <Select >
                                <Option value={true}>Public</Option>
                                <Option value={false} >Private - only site editor can see this post</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item  >
                            <Button style={{float:"right"}} type="primary" htmlType="submit">Save</Button>
                        </Form.Item>
                    </Form>


                </Panel>

                <Panel key="2" header={<b>Permalink</b>}>
                <Form name="url-form" layout="vertical" onFinish={onFinish} form={urlForm}>
                        <Form.Item
                        label="URL"
                        name="url"
                        >
                            <Input/>
                        </Form.Item>
                        <p>Last part of the url</p>
                        <p>Preview url: "Root url here"{}</p>

                        <Form.Item >
                            <Button style={{float:"right"}} type="primary" htmlType="submit">Save</Button>
                        </Form.Item>
                    </Form>
                    
                </Panel>
            </Collapse>
        </div>
    );
};



export default PostSetting;