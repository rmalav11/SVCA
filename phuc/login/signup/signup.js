function logout(){
    if (!localStorage.token){
        return
    }
    $.ajax({
        type: 'POST',
        url: 'https://svca-production.herokuapp.com/react/logout/',
        headers: {
            'Authorization': 'token ' + localStorage.token
        },
        error: function(response){
            console.log(response);
        },
        success: function(response){
            console.log(response);
        }
    });
    //remove the token
    localStorage.removeItem('token');
    $('#logout-div').hide();
    $('#signup-div').show();

}

//require sign out if there's already a token
// check if already have a token
if (localStorage.token){
    // if a token is present, move to the dashboard page
    $('#logout-div').show();
    $('#signup-div').hide();
}

$( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    console.log( $( this ).serialize() );
    $.ajax({
        type: 'POST',
        url: 'https://svca-production.herokuapp.com/react/signup/',
        data: $( this ).serialize(),
        error: function(response){
            console.log(response);
        },
        success: function(response){
            console.log("Success!");
            if (response.status = 1){
                window.location.href="./index.html";
            }
            
        }
    });
});