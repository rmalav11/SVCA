// check if already have a token
if (localStorage.token){
    // if a token is present, check if that token work
    $.ajax({
        type: 'GET',
        url: 'https://sv-communityadvocates.org/api/react/myinfo/',
        headers: {
            'Authorization': 'token ' + localStorage.token
        },
        error: function(response){
            console.log(response);
        },
        success: function(response){
            console.log(response);
            if (getParameterByName('redirect')){
                window.location.href= getRedirect();
            }
            
        }
    });
    // window.location.href="dashboard.html";
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

function getRedirect() {
    // var currentHost = location.host;
    // var redirectURL = getParameterByName('redirect');
    // if (new URL(redirUrl).host != currentHost)
    //     return false;
    // else
    //     return redirectURL;

    return getParameterByName('redirect');
}

$( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    console.log( $( this ).serialize() );
    $.ajax({
        type: 'POST',
        url: 'https://sv-communityadvocates.org/api/react/login/',
        data: $( this ).serialize() + "&device=" + platform.description,
        error: function(response){
            console.log("Error:" + response);
        },
        success: function(response){
            if (response.status = 1){
                console.log("Success!");
                localStorage.setItem('token', response.token);

                if (getParameterByName('redirect')){
                    window.location.replace(getRedirect());
                }
            }
            
            
        }
    });
});