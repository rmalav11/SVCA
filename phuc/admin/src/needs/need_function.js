import $, { Callbacks } from 'jquery';

export const listNeeds = (callback) => {
    if (localStorage.token){
        $.ajax({
            type: 'GET',
            url: 'https://sv-communityadvocates.org/api/react/needs-summary/',
            headers: {
                'Authorization': 'token ' + localStorage.token
            },
            success: function(response){
                callback(response);
            },
            error: function(){
                alert("Get members fail");
            }
        })
    }
}