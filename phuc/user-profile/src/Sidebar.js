import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import {  Menu, Layout } from 'antd';
import $ from 'jquery';


import {
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    UploadOutlined,
    BarsOutlined,
} from '@ant-design/icons';

const {  Sider } = Layout;

const Sidebar = (props) => {
    const [isSuperUser, setIsSuperUser] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    const checkPermission = (perm, successcallback, failcallback) => {
        $.ajax({
          type: "POST",
          url: 'https://sv-communityadvocates.org/api/react/check-permission/',
          headers: {
            'Authorization': 'token ' + localStorage.token
          },
          data:{
            'permission': perm,
          },
          error: function(response) {
            if (failcallback) 
              failcallback(response);
          },
          success: function(response){
            if (successcallback)
              successcallback(response);
          }
        });
    }

    const toggle = () => {
        setCollapsed(!collapsed);
      };

    useEffect(() => {
        checkPermission("is_super_user", (response) => {
                setIsSuperUser(true);
            }, (response) => {
                setIsSuperUser(false);
            })
    }, [])


    return (
        <div>
            <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
                <Menu theme="light" mode="inline" selectedKeys={['2']}>
                    <Menu.Item key="1" icon={<BarsOutlined />} title="Dashboard">
                        <a href="/admin/dashboard/">Dashboard</a>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        Account setting
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UsergroupAddOutlined />} title="Account manage" hidden={!isSuperUser}>
                        <a href="/admin/account-manage/">Account manage</a>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => toggle()} icon={collapsed? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}>
                        {collapsed? "Expand":"Collapse"}
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>
    );
};


export default Sidebar;