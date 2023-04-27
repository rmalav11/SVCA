// check if already have a token
if (localStorage.token){
    // if a token is present, move to the dashboard page
    window.location.href="dashboard.html";
}

$( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    console.log( $( this ).serialize() );
    $.ajax({
        type: 'POST',
        url: 'http://sv-communityadvocates.org/react/login/',
        data: $( this ).serialize() + "&device=" + platform.description,
        error: function(response){
            console.log("Error:" + response);
        },
        success: function(response){
            console.log("Success!");
            if (response.status = 1){
                localStorage.setItem('token', response.token);
            }
            
        }
    });
});