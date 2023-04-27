var myModal = new bootstrap.Modal(document.getElementById('successModal'), {});
$( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    console.log("Submitting")
    console.log( $( this ).serialize() );
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/react/need/submit',
        //url: 'https://sv-communityadvocates.org/api/react/need/submit',
        data: $( this ).serialize(),
        error: function(response){
            console.log("Error:" + response);
        },
        success: function(response){
            console.log("Success!");
            var myModal = new bootstrap.Modal(document.getElementById('successModal'), {});
            myModal.toggle();
            
        }
    });
});