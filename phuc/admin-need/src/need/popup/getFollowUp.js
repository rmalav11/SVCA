import $ from 'jquery';

export const getFollowUp = (id, successCallback, failCallback) => {
    if (localStorage.token){
        $.ajax({
            type: 'GET',
            url: 'https://sv-communityadvocates.org/api/react/need-follow-up/?response='+id,
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