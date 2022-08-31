$(document).ready(function(){
    $('#Sign-In').on('click', function () {
        let login = $("input[name='login']")
        let Pswrd = $("input[name='password']")
        if(isFormValid(login, Pswrd)){
            fadeAlertMsg()
            logInto(login.val(), Pswrd.val())
        }
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

/* GESTION DES ERREURS */
function animateForm(input){
    input.addClass("incorrect")
    input.css('animation', "bounce-in 1.15s ease")
    input.on('animationend', function(){
        input.css('animation', "")
    })
}


function isFormValid(input1, input2){
    clearInputClassError()

    let errorWrapper = $(".alert-wrapper")
    let errorMsg = $(".error-msg")

    if((input1.val() == "") && (input2.val() == "")){
        animateForm(input1)
        animateForm(input2)

        displayErrorMsg(errorWrapper, errorMsg, "Ces informations doivent être fournies pour accéder à E-Ndrana!")
        return false
    }

    else if(input1.val() == ""){
        animateForm(input1)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez renseigner le login!")
        return false
    }

    else if(input2.val() == ""){
        animateForm(input2)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez renseigner le mot de passe!")
        return false
    }
    else{
       
        return true
    }
}

function clearInputClassError(){
    const inputs = $("input")
    if(inputs.hasClass("incorrect")){
        inputs.removeClass("incorrect")
    }
}



function displayErrorMsg(container, errorMsg, msg){
    container.addClass("show")
    errorMsg.text(msg)
}

function fadeAlertMsg(){
    if($(".alert-wrapper").hasClass("show")){
        $(".alert-wrapper").removeClass("show")
    }
}