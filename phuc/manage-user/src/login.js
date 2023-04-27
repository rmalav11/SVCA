import $ from 'jquery';
// check if already have a token
// and check if the token is valie/user is logged in
function saveLogin(){
    if (localStorage.token){
        $.ajax({
            type: 'GET',
            url: '/api/react/myinfo/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            success: function(response){
                localStorage.setItem('username', response.username);
                localStorage.setItem('first_name', response.first_name);
                localStorage.setItem('last_name', response.last_name);
                localStorage.setItem('email', response.email);
            },
            error: function(){
                localStorage.removeItem("token");
            }
        })
    }
}

export const getLogin = (callback) => {
    if (localStorage.token){
        $.ajax({
            type: 'GET',
            url: 'https://sv-communityadvocates.org/api/react/myinfo/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            success: function(response){
                callback(response);
            },
            error: function(){
                console.log('error');
                
                // alert("Log in fail");
                window.location.replace("/admin/login?redirect="+window.location.href); //redirect to the login page
                
            }
        })
    }
    else{
        //no token, redirect to the login page to get token
        window.location.replace("/admin/login?redirect="+window.location.href); //redirect to the login page
    }
}


