import $ from 'jquery';

export const getUserList = (successCallback, failCallback) => {
    if (localStorage.token){
        $.ajax({
            type: 'GET',
            url: 'https://sv-communityadvocates.org/api/react/users/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            error: function(response){
                console.log("Error: ", response);
                if (failCallback)
                    failCallback(response);
            },
            success: function(response){
                console.log("Success: ", response)
                if (successCallback)
                    successCallback(response);
            }
        });
    }
}
