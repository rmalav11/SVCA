$( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    console.log("Submitting")
    console.log( $( this ).serialize() );
    $.ajax({
        type: 'POST',
        url: 'https://sv-communityadvocates.org/api/react/need/submit',
        data: $( this ).serialize(),
        error: function(response){
            console.log(response);
        },
        success: function(response){
            console.log("Success!");
            if (response.status = 1){
                localStorage.setItem('token', response.token);
            }
            
        }
    });
});