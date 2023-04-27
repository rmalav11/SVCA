// https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

// Parse data to display and confirm
rawData = decodeURIComponent(findGetParameter('data'));
memberData = JSON.parse(rawData);
if (memberData){
    console.log("a");
    $('#user-name').text(memberData['name']);
    $('#user-email').text(memberData['email']);
    $('#user-phone').text(memberData['phone']);
    $('#signup-email').val(memberData['email']);
    $('#member-id').val(memberData['id']);
}
console.log(JSON.parse(decodeURIComponent(findGetParameter('data'))));

$( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    console.log( $( this ).serialize() );
    $.ajax({
        type: 'POST',
        url: '/api/react/member-signup/',
        data: $( this ).serialize(),
        error: function(response){
            console.log(response);
        },
        success: function(response){        
            alert("Success!");
        }
    });
});