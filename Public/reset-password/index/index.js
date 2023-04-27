$( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    console.log( $( this ).serialize() );
    $.ajax({
        type: 'POST',
        // url: 'https://sv-communityadvocates.org/api/react/reset-password/',
        url: 'https://sv-communityadvocates.org/api/react/reset-password/',
        data: $( this ).serialize(),
        error: function(response){
            alert("Reset password request fail, please check your email again.")
        },
        success: function(response){
            window.location.href = "./success.html"
            
        }
    });
});