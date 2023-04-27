
import $ from 'jquery';

export const listMembers = (callback) => {
    if (localStorage.token){
        $.ajax({
            type: 'GET',
            url: 'https://sv-communityadvocates.org/api/react/members/',
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