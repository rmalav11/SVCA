import $ from 'jquery';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const getRedirect = () => {
    // var currentHost = location.host;
    // var redirectURL = getParameterByName('redirect');
    // if (new URL(redirUrl).host != currentHost)
    //     return false;
    // else
    //     return redirectURL;

    return getParameterByName('redirect');
}

export const checkLogin = () =>{
    if (localStorage.token){
        // if a token is present, check if that token work
        $.ajax({
            type: 'GET',
            url: 'https://sv-communityadvocates.org/api/react/myinfo/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            error: function(response){
                console.log(response);
                localStorage.removeItem('token');
            },
            success: function(response){
                console.log(response);
                confirm({
                    title: 'Do you want to loggin again?',
                    icon: <ExclamationCircleOutlined />,
                    content: 'It seems like you already logged in, do you want to log in again? You may also want to check your account\'s permission.',
                    okText: "Yes",
                    cancelText: "No",
                    onOk() {
                        if (localStorage.token){
                            
                            $.ajax({
                                type: 'POST',
                                url: 'https://sv-communityadvocates.org/api/react/logout/',
                                headers: {
                                    'Authorization': 'token ' + localStorage.token
                                },
                                error: function(response){
                                    console.log(response);
                                },
                                success: function(response){
                                    console.log(response);
                                }
                            });
                            localStorage.removeItem('token');
                        }
                    },
                    onCancel() {
                        if (getParameterByName('redirect')){
                            window.location.href= getRedirect();
                        } else{
                            window.location.href = "/admin/profile/"
                        }
                    },
                  });
                
                
            }
        });
        // window.location.href="dashboard.html";
    }
}