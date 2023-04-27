import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Col, Row } from 'antd';

import PostEditor from '../posteditor';
import PostSetting from '../postsetting';


const PostBody = (props) => {

    return(
        <Row>
            <Col xs={24} md={props.showSetting?18:24}>
                <PostEditor/>
                {/* <h1>Mew</h1> */}
            </Col>

            <Col xs={24} md={6} style={{borderLeft:"1px solid #e0e0e0"}} hidden={!props.showSetting}>
                <PostSetting/>
            </Col>
        </Row>
    )
}

export default PostBody;