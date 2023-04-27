import { useFormik, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { getLogin } from './login';
import $ from 'jquery';
import 'antd/dist/antd.css';
import { Divider, notification } from 'antd';

function AccountInfo(props){
    const [userData, setUserData] = useState(null);

    
    // getLogin((response) => {
    //     setUserData(response);
    //     infoForm.setValues("first_name", response.first_name);
        
    // })

    const infoForm = useFormik({
        initialValues:{
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password:'',
        },
        onSubmit: values =>{
            console.log(values);
            $.ajax({
                type: 'PATCH',
                url: 'https://sv-communityadvocates.org/api/react/user/' + userData.id +'/',
                data: values,
                headers: {
                    'Authorization': 'token ' + localStorage.token
                },
                error:function(response){
                    console.log(response);
                    notification['error']({
                        message: 'Update failed',
                        description: 'An error happened!',
                    });

                    //update login data again
                    getLogin((response) => {
                        setUserData(response);
                    })
                },
                success: function(response){
                    console.log(response);
                    notification['success']({
                        message: 'Update successfully',
                        description: 'Your account information has beed update successfully'
                    })

                    //update login data again
                    getLogin((response) => {
                        setUserData(response);
                    })
                }
            })
        }
    })


    useEffect(()=>{
        getLogin((response) => {
                
                
                // infoForm.setFieldValue("first_name", response.first_name);
                // infoForm.setFieldValue("last_name", response.first_name);
                // infoForm.setFieldValue("email", response.email);
                infoForm.setFieldValue("email", response.email);
                infoForm.setFieldValue("first_name", response.first_name);
                infoForm.setFieldValue("last_name", response.last_name);
                infoForm.setFieldValue("username", response.username);
                

                // infoForm.values.email = response.email;
                setUserData(response);
                console.log(infoForm);
    })
    },[]);

    useEffect(() =>{
        if (infoForm.values.email && infoForm.touched.email)
            infoForm.setFieldValue('username', infoForm.values.email);
    }, [infoForm.values.email, infoForm.touched.email, infoForm.setFieldValue])

    // useEffect(()=>{
    //     if (infoForm.values != null && userData != null){
    //         console.log("a");
    //         console.log(infoForm.values);
    //         infoForm.values.email = userData.email;
    //         infoForm.values.first_name = userData.first_name;
    //         infoForm.values.last_name = userData.last_name;
    //     }
    // }, [userData, infoForm]);

    return (
        <div className="container">
            <div className="container-md rounded-3 p-3 m-3">
                {/* <h2>Personal Information</h2>
                <hr></hr> */}
                <Divider orientation="left"><h2>Personal information</h2></Divider>
                <form onSubmit={infoForm.handleSubmit}>
                    <div className="row">
                        <div className='col my-2'>
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                id="username"
                                type="text"
                                className="form-control"
                                readOnly = {true}
                                {...infoForm.getFieldProps('username')}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <label htmlFor="first_name" className="form-label">First name</label>
                            <input 
                                id="first_name" 
                                // name="first_name" 
                                type="text" 
                                className="form-control"
                                {...infoForm.getFieldProps('first_name')}
                            />
                        </div>

                        <div className="col-sm">
                            <label htmlFor="last_name" className="form-label">Last name</label>
                            <input 
                                id="last_name" 
                                // name="first_name" 
                                type="text" 
                                className="form-control"
                                {...infoForm.getFieldProps('last_name')}
                            />
                        </div>
                    </div>

                    <div className="col-12 my-2">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                id="email" 
                                //name="email" 
                                type="email" 
                                className="form-control"
                                
                                {...infoForm.getFieldProps('email')}
                                // onChange={infoForm.handleChange}
                                // value={infoForm.values.email}

                            />
                    </div>
                    <div className="col-12 my-2">
                        <button className="btn btn-primary float-end" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}

export default AccountInfo;