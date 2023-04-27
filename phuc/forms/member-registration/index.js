// function myFunction() {
//     alert("Thank you for registering to become a member! We will get back to you soon.");
// }

$( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    console.log( $( this ).serialize() );
    $.ajax({
        type: 'POST',
        url: 'http://api.sv-communityadvocates.org/api/react/members/',
        data: $( this ).serialize(),
        error: function(response){
            console.log(response);
        },
        success: function(response){
            
            alert("Success!");
            console.log(response);
            data = encodeURIComponent(JSON.stringify(response));
            window.location.href = "./signup.html?data="+data;
        }
    });
});