import $ from 'jquery';

export const getNeed = (id, successCallback, failCallback) =>{
    if (localStorage.token){
        $.ajax({
            type: 'GET',
            url: 'https://sv-communityadvocates.org/api/react/needs/'+id+'/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            success: function(response){
                if (successCallback)
                    successCallback(response);
            },
            error: function(response){
                if (failCallback)
                    failCallback(response);
            }
        })
    }
}