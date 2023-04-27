import $ from 'jquery';

export const logoutAll = (callbackSuccess, callbackFail) =>{
    $.ajax({
        type: 'POST',
        url: 'https://sv-communityadvocates.org/api/react/logout-all/',
        headers: {
            'Authorization': 'token ' + localStorage.token
        },
        error: function(response){
            console.log(response);
            if (callbackFail)
                callbackFail(response);
        },
        success: function(response){
            console.log(response);
            if (callbackSuccess)
                callbackSuccess(response);
            
        }
    });
}