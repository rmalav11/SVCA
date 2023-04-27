import $ from 'jquery';

export const getAssessment = (id, successCallback, failCallback) => {
    if(localStorage.token){
        $.ajax({
            type: 'GET',
            url: 'https://sv-communityadvocates.org/api/react/need-assessment/?response='+id,
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