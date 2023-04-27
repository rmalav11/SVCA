// check if already have a token
// and check if the token is valie/user is logged in
if (localStorage.token){
    $.ajax({
        type: 'GET',
        url: 'https://svca-production.herokuapp.com/react/myinfo/',
        headers: {
            'Authorization': 'token ' + localStorage.token
        },
        success: function(response){
            localStorage.setItem('username', response.username);
            localStorage.setItem('first_name', response.first_name);
            localStorage.setItem('last_name', response.last_name);
            localStorage.setItem('email', response.email);
        },
        error: function(){
            localStorage.removeItem("token");
        }
    })
}
