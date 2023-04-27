import { useEffect, useState } from "react"
import 'antd/dist/antd.css';
import { Table, Divider, notification } from 'antd';
import $ from 'jquery';

function DeviceList(props){
    
    const [devicesData, setDevicesData] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 24
        
    });
    const [loading, setLoading] = useState(false);

    const updateDevices = (page, callback) => {
        $.ajax({
            type: 'GET',
            // url: 'https://sv-communityadvocates.org/api/react/list-devices/',
            url: 'https://sv-communityadvocates.org/api/react/list-devices/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            data:{
                ...page,
            },
            error: function(response){
                notification["error"]({
                    message: "Get list of devices failed!",
                    description: "Unable to retrieve the list of your devices, please try again later"
                })
                console.log(response);
            },
            success: function(response){
                console.log(response);
                if (callback)
                    callback(response);
            }
        });
    }

    const getDevices = (callback) => {
        $.ajax({
            type: 'GET',
            // url: 'https://sv-communityadvocates.org/api/react/list-devices/',
            url: 'https://sv-communityadvocates.org/api/react/list-devices/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            data:{
                ...pagination,
            },
            error: function(response){
                console.log(response);
                notification["error"]({
                    message: "Get list of devices failed!",
                    description: "Unable to retrieve the list of your devices, please try again later"
                })
            },
            success: function(response){
                console.log(response);
                if (callback)
                    callback(response);
            }
        });
    }

    const logOut = (id, callback) => {
        $.ajax({
            type: 'POST',
            url: 'https://sv-communityadvocates.org/api/react/remove-device/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            data: {
                'tokenid': id,
            },
            error: function(response){
                console.log(response);
                notification.error({
                    message: 'Action failed',
                    description: 'An error has happened, no device is logged out'
                })
            },
            success: function(response){
                console.log(response);
                notification.success({
                    message: 'Device removed',
                    description: 'You have logged out from a device.'
                })
                getDevices((response) => {
                    setDevicesData(response.results);
                    setPagination({
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: response.count
                    })
                });
                if (callback)
                    callback(response);
            }
        });
    }

    const logOutAll = () => {
        $.ajax({
            type: 'POST',
            url: 'https://sv-communityadvocates.org/api/react/logout-all/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            error: function(response){
                console.log(response);
                notification.error({
                    message: 'Action failed',
                    description: 'An error has happened, no device is logged out'
                })
            },
            success: function(response){
                console.log(response);
                notification.success({
                    message: 'Device removed',
                    description: 'You have logged out from all other device.'
                })
                getDevices((response) => {
                    setDevicesData(response.results);
                    setPagination({
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: response.count
                    })
                });
                
            }
        });
    }
    const handleTableChange = (tablePagination, tableFilter, tableSorter) =>{
        console.log(tablePagination);
        setPagination(tablePagination);
        updateDevices(tablePagination, (response) => {
            setDevicesData(response.results);
            setPagination({
                current: tablePagination.current,
                pageSize: tablePagination.pageSize,
                total: response.count
            })
        })
    }

    useEffect(() => {
        getDevices((response) => {
            setDevicesData(response.results);
            setPagination({
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: response.count

            })
        })
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Devices',
            dataIndex: 'devices',
            key: 'devices',
        }, 
        {
            title: 'Signed in date',
            dataIndex: 'created',
            key: 'created',
            render: created => (
                <div>{
                    (new Date(Date.parse(created))).toString()
                    }</div>
            )
        },
        {
            title:'Actions',
            dataIndex: 'id',
            key: 'id',
            render: id => (
                <div>
                    <button className="btn btn-danger float-end" onClick={() =>logOut(id)}><i class="far fa-trash-alt"></i></button>
                </div>
            )
        }
    ]
    return (
        <div className="container">
            <div className="container-md rounded-3 p-3 m-3">
            <Divider orientation="left"><h2>List of signed in devices</h2></Divider>
                {/* <h2>List of signed in devices</h2>
                <hr></hr> */}
                <button className="btn btn-danger float-end" style={{margin:"1rem"}} onClick={() => logOutAll()}>Delete all</button>
                <div className="container">
                    <Table dataSource={devicesData} columns={columns} pagination={pagination} loading={loading} onChange={handleTableChange}/>
                </div>
            </div>

        </div>
    )
}

export default DeviceList;