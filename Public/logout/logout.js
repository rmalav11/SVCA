

function logout(){
    if (!localStorage.token){
        window.location.replace('/');
        return
    }
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
    //remove the token
    localStorage.removeItem('token');
    window.location.replace('/');

}

logout();