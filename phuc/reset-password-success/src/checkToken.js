import $ from 'jquery'

function checkToken( token, successCallback, failCallback){
    $.ajax({
        type: 'POST',
        url: 'https://sv-communityadvocates.org/api/react/reset-password/validate_token/',
        data: {
            'token': token,
        },
        error:function(response){
            if (failCallback)
                failCallback(response);
        },
        success: function(response){
            if (successCallback)
                successCallback(response);
        }
    })
}

export default checkToken;