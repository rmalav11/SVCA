import React, {useState, useEffect } from 'react';
import axios from 'axios';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {notification, Table, Button, Menu, Dropdown} from 'antd';
import { getPaginatedPost, updatePostPublic } from './postFunction';
import { DownOutlined } from '@ant-design/icons';


const menu =  (record) => {
    return(<Menu >
        <Menu.Item key="1" hidden={record.public} onClick={() => updatePostPublic(record.id, true)}>
            Publish
        </Menu.Item>
        <Menu.Item key="2" hidden={!record.public}onClick={() => updatePostPublic(record.id, false)}>
            Switch to draft
        </Menu.Item>
        <Menu.Item key="3" danger>
            Delete
        </Menu.Item>
    </Menu>)
}

const columns = [
    {
        title: "Title",
        dataIndex: "title",
        render: (text, record, index) =>(
            <div>
                {text}
                <span hidden={record.public} style={{color:"gray"}}>- Draft</span>
            </div>
        )

    },
    {
        title: 'Author',
        dataIndex: "author",
    },
    {
        title: 'URL',
        dataIndex: "url",
    },
    {
        title: 'Date created',
        dataIndex: 'created_date',
        align: 'right',
        render: created_date => (
            <div>{(new Date(Date.parse(created_date))).toString()}</div>
        )
    },
    {
        title: 'Action',
        dataIndex: 'public',
        align:'right',
        render: (text, record, index) =>(
            <Dropdown.Button overlay={menu(record)}>
                Edit             
            </Dropdown.Button>
            // <div>a</div>
        )
    },
]

function PostList(props) {

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    })
    const [tableLoading, setTableLoading] = useState(false);
    const [data, setData] = useState([]);
    const [rawData, setRawData] = useState([])



    useEffect(() => {
        getPaginatedPost( {pagination}, (response) =>{
            console.log(response);
            setData(response.results);
            setRawData(response);
            setPagination({
                total: response.count,
                // total: 100,
                current: pagination.current,
                pageSize: pagination.pageSize,
            })
        })
    }, [])

    const handleTableChange = (pagination, filters, sorter) =>{
        fetchData({
            pagination,
        })
    }

    const fetchData = (params) =>{
        setTableLoading(true);
        // console.log(...params)
        getPaginatedPost(params, (response) => {
            setPagination({
                current: params.current,
                pageSize: params.pageSize,
                total: response.count
            });
            setData(response.results);
            setTableLoading(false);
        })
    }

    return (
        <div className="container">
            <h2 className="container my-4" >POSTS - <Button classNam="mx-4" type="primary" size="large">Add new</Button></h2>
            <Table
                columns={columns}
                dataSource={data}
                loading={tableLoading}
                onChange={handleTableChange}
                pagination={pagination}
                rowKey="id"
            />
        </div>
    );
}

export default PostList;