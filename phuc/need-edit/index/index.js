const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
console.log(params['id']);

function fillForm(response){
    //filling up the form
    $('#first-name').val(response['first_name']);
    $('#last-name').val(response['last_name']);
    $('#phone').val(response['phone']);
    $('#email').val(response['email']);
    $('#email-phone-selection');
    $('#gender');
    $('#ethnicity').val(response['ethnicity']);
    $('#language').val(response['language']);
    $('#relationship').val(response['relationship']);
    $('#0-18').val(response['family18']);
    $('#19-54').val(response['family19']);
    $('#55').val(response['family55']);
    $('#need').val(response['needs']);
    $('#address').val(response['address']);
    $('#gender option[value='+response['gender']+']').attr('selected', 'select');
    $('#email-phone-selection option[value='+response['contact_reference']+']').attr('selected', 'select');

    //check box for vuln group
    // https://stackoverflow.com/questions/11454630/auto-checkbox-based-from-url-value-using-javascript-jquery
    $('input[name=vulnerable_groups]').prop('checked', function(){
        return $.inArray(this.value, response['vulnerable_groups']) !== -1;
    });
}

// if (!params['id'] && !localStorage.token){
if (!params['id']){
//redirect to somewhere with no local token
window.history.back();
}
if (!localStorage.token){
    localStorage.setItem('token', '4c14224757630adf7ccb76278ad3538b6ea8addd')
    //window.location.href = "/admin/login?redirect="+window.location.href; //redirect to the login page

} else{
    localStorage.setItem('token', '4c14224757630adf7ccb76278ad3538b6ea8addd')
    //check if login is working
    $.ajax({
        type: 'GET',
        url: 'https://sv-communityadvocates.org/api/react/myinfo/',
        headers: {
            'Authorization': 'token ' + localStorage.token
        },
        success: function(response){
            // if success, do nothing and continue with the site
        },
        error: function(){
            alert("Log in fail");
            window.location.href = "/admin/login?redirect="+window.location.href; //redirect to the login page
        }
    });

    $.ajax({
        type: 'GET',
        //url: 'https://sv-communityadvocates.org/api/react/need/submit',
        url: 'https://sv-communityadvocates.org/api/react/needs/'+params['id']+'/',
        headers: {
            'Authorization': 'token ' + localStorage.token
        },
        data: $( this ).serialize(),
        error: function(response){
            console.log("Error:" + response);
        },
        success: function(response){
            console.log("Success!");
            console.log(response);
            fillForm(response);
            
        }
    });
}


$( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    console.log("Submitting")
    console.log( $( this ).serialize() );
    $.ajax({
        type: 'PATCH',
        //url: 'https://sv-communityadvocates.org/api/react/need/submit',
        url: 'https://sv-communityadvocates.org/api/react/needs/'+params['id']+'/',
        headers: {
            'Authorization': 'token ' + localStorage.token
        },
        data: $( this ).serialize(),
        error: function(response){
            console.log("Error:" + response);
        },
        success: function(response){
            console.log("Success!");
            window.location.href = '/admin/dashboard/need/?id=' + params['id'];
            
        }
    });
});

function deleteRequest(){
    $.ajax({
        type: 'DELETE',
        url: 'https://sv-communityadvocates.org/api/react/needs/'+params['id']+'/',
        headers: {
            'Authorization': 'token ' + localStorage.token
        },
        success: function(response){
            window.location.href = '/admin/dashboard/';//??
        },
        error: function(){
            alert('delete fail');
        }
    });
}