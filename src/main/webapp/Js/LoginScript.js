$(document).ready(function(){
    $('#Sign-In').on('click', function () {
        let login = $("input[name='login']").val()
        let Pswrd = $("input[name='password']").val()
        logInto(login, Pswrd)
    })
})

function logInto(_login, _Pswrd) {
    $.ajax({
        type: "POST",
        data:{
            login: _login,
            Pswrd: _Pswrd,
            RequestType: "SingIn"
        },
        url: "login",
        cache: false,
        dataType: "json",
        success: function (data) {
            $.each(data, (index, response)=>{
                if(response.requestStatusCode == 200){
                    sessionStorage.setItem("userConnected", true)
                    $(location).attr('href', "list_Pret");
                }
            })
        }
    })
}