import React, {useState, useEffect } from 'react';
import 'antd/dist/antd.css';

import { Form, Input, Button, Row, Col, notification } from 'antd';
import { EDITOR_JS_TOOLS } from "./constants";

// import EditorJS from '@editorjs/editorjs';  
// import Header from '@editorjs/header'; 
// import List from '@editorjs/list';

import EditorJs from 'react-editor-js';
import { createPostContent, updatePostContent } from '../../tools/postFunction';

import './index.css';
import PostSetting from '../postsetting';
import ImageTool from '@editorjs/image';


// const editor = new EditorJS({ 
//     /** 
//      * Id of Element that should contain the Editor 
//      */ 
//     holder: 'editorjs', 
//     autofocus: true,
//     tools:{
//         header: {
//             class: Header, 
//             inlineToolbar: true 
//         }, 
//         list: List,
//         image:{
//             class: ImageTool,
//         },
//         // placeholder: "Your page content goes here!",
//     },
//     // data:props.contentData,
//     // placeholder: "Your page content goes here!",

// });


function PostEditor (props) {
    const [form] = Form.useForm();
    const [editorInstance, setEditor] = useState(null);
    const [timeoutSave, setTimeoutSave] = useState(null);

    function handleChange() {
        if (props.saveState && props.saveState.autoSave === false)
            return

        if (props.contentData && props.contentData.length > 0){
            if (timeoutSave != null)
                setTimeoutSave(clearTimeout(timeoutSave));
            setTimeoutSave(setTimeout(async function(){
                // console.log(props.contentData);
                const savedData = await editorInstance.save();
                updatePostContent(props.contentData[props.contentData.length -1 ].id, {content: savedData});
            }, 5000))
        } else {
            notification['warning']({
                message:"You haven't create a post yest",
                description: "No content has been saved, you need to create a new post title and save it in the setting first!"
            });
        }
        
    }

    async function handleSave(){
        if (props.contentData && props.contentData.length > 0){
                // console.log(props.contentData);
                const savedData = await editorInstance.save();
                updatePostContent(props.contentData[props.contentData.length -1 ].id, {content: savedData}, (response) =>{
                    notification["success"]({
                        message:"Post saved!",
                    })
                }, (error) =>{
                    notification["error"]({
                        message:"An error happened, please try again.",
                    })
                });
        } else {
            notification['warning']({
                message:"You haven't create a post yest",
                description: "No content has been saved, you need to create a new post title and save it in the setting first!",
                duration: 15,
            });
        }
    }

    // If there's no post content, create one and save its ID?
    useEffect(() => {
        if (props.contentData && props.postData && props.contentData.length < 1){
            createPostContent(props.postData.id,(response)=>{
                notification['info']({
                    message:"Editor connected to something!",
                });
                props.setContentData([response])
            }, (response)=>{
                notification['error']({
                    message:"Something went wrong.",
                    description: "Cannot create new post body, why???"
                });
            });
        }
    }, [props.contentData, props.postData])

    //save the function for saving the content
    // This is terrible, why am i making this
    useEffect(() =>{
        props.setSaveButton(() => handleSave());
    }, [props.contentData, editorInstance])

    return (
        <div>


            <Row>
                <Col xs={{span:24, order:2}} md={{span: props.showSetting?18:24, order:1}}>
                    {/* <EditorJs  onReady={readyFunction}  instanceRef={instance => setEditorInstance(instance)} tools={EDITOR_JS_TOOLS} /> */}
                    {/* <div id="editorjs"></div> */}
                    {props.contentData !== null?<EditorJs instanceRef={ instance => setEditor(instance)} data={props.contentData && props.contentData.length > 0? props.contentData[props.contentData.length -1 ].content: {}}  
                        tools={EDITOR_JS_TOOLS}
                        placeholder="Add your first paragraph here!"
                        onChange={() => {handleChange()}}
                        />:<></>}
                </Col>

                <Col xs={{span:24, order:1}} md={{span:6, order: 2}} style={{borderLeft:"1px solid #e0e0e0"}} hidden={!props.showSetting}>
                    <PostSetting
                        postData={props.postData} setPostData={props.setPostData}
                        contentData={props.contentData} setContentData={props.setContentData}
                    />
                </Col>
            </Row>
            

            
        </div>
    );
};



export default PostEditor;