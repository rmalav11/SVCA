import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { PageHeader, Button, Descriptions, Tag, Form, Input, Switch } from 'antd';

import { IoSettingsOutline } from 'react-icons/io5';

const PostHeader = (props) =>{
    const [showForm, setShowForm] = useState(false);
    return(<PageHeader
        style={{borderBottom:"1px solid #e0e0e0"}}
        ghost={false}
        className="site-page-header"
        title={props.postData? props.postData.title: "New title"}
        tags={props.postData && props.postData.public?<Tag color="blue">Public</Tag>:<Tag color="grey">Draft</Tag>}
        extra={[
            <span className="mx-3"><span className="mx-3">Autosave</span><Switch key="3" checked={props.saveState.autoSave} 
            onChange={() => {props.setSaveState({
                autoSave: !props.saveState.autoSave,
                saveState: props.saveState.saveState,
                })}
            }
            ></Switch></span>,
            <Button key="1" type="primary" loading={props.saveState.saveState} onClick={() => props.savePost()}>Save</Button>,
            <Button key="2" onClick={props.toggleSetting}><IoSettingsOutline/></Button>,
        ]}
        >
            <div className={"container"} hidden={!showForm}>
                <Form name="page-create"
                layout="verticle"
                >
                    <Form.Item label="Post title" name="title">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Post url" name="url">
                        <Input/>
                    </Form.Item>
                </Form>
            </div>
    </PageHeader>)
}

export default PostHeader;