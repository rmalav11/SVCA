
import React, { useEffect, useState } from 'react';
import { getUserList } from './tool/getUser';
import 'antd/dist/antd.css';
import {notification, Table, Button} from 'antd';
import Title from 'antd/lib/skeleton/Title';
import UserEdit from './UserEdit';


function UserList(props) {

    const [userList, setUserList] = useState(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const updateExpandedRowKeys = ( record ) => {
        let localExpandedRowKeys = [...expandedRowKeys];
        localExpandedRowKeys.includes(record.id)? localExpandedRowKeys.splice(expandedRowKeys.indexOf(record.id),1): localExpandedRowKeys.push(record.id)
        // const rowKey = record.id;
        // const isExpanded = expandedRowKeys.find(key => key === rowKey);
        // console.log("record:", record);
        // let localExpandedRowKeys = [];
        // if (isExpanded) {
        //     localExpandedRowKeys = localExpandedRowKeys.reduce((acc, key) => {
        //     if (key !== rowKey) acc.push(key);
        //     return acc;
        //     }, []);
        // } else {
        //     localExpandedRowKeys.push(rowKey);
        // }
        setExpandedRowKeys([...localExpandedRowKeys]);
    }
    
    const onExpand = (expanded, record) => {
        updateExpandedRowKeys(record);
    };

    useEffect(() => {
        getUserList((successResponse) => {
            setUserList(successResponse);
        }, (failResponse) => {
            notification["error"]({
                message: "Unable to retrieve list of user!",
                description: "Please check your account permission?"
            })
        })
    }, []);

    const updateData = () => {
        getUserList((successResponse) => {
            setUserList(successResponse);
        }, (failResponse) => {
            notification["error"]({
                message: "Unable to retrieve list of user!",
                description: "Please check your account permission?"
            })
        })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key:'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'First name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Date created',
            dataIndex: 'date_joined',
            key: 'date_joined',
            render: date_joined => (
                <div>{
                    (new Date(Date.parse(date_joined))).toString()
                    }</div>
            )
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (text, record, index) =>(
                <div>
                <Button type="" onClick={rowKey => updateExpandedRowKeys(record)}>Edit</Button>

                </div>
            )
        }
    ]
    // https://stackoverflow.com/questions/46867535/antd-is-it-possible-to-move-the-table-row-expander-inside-one-of-the-cells
    return (
        <div>
            <div className="container">
                <h2>Account manager</h2>
                <div className="container">
                    <Table dataSource={userList} columns={columns}
                    expandable={{
                        expandedRowRender: record => (<div>{<UserEdit record={record} updateCallback={updateData}/>}</div>),
                        expandIconColumnIndex: -1,
                        
                    }}
                    expandedRowKeys={expandedRowKeys}
                    rowKey="id"
                    />
                </div>
            </div>
        </div>
    );
}

export default UserList;