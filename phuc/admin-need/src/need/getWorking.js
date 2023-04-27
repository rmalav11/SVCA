import $ from 'jquery';

export const getWorking = (id, successCallback, failCallback) => {
    if (localStorage.token){
        $.ajax({
            type: 'GET',
            url: 'https://sv-communityadvocates.org/api/react/needs-working/?response='+id,
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
