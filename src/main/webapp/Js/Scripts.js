$(document).ready(function(){
    $('#updatePassword').on('click', function () {
        let currentPswrd = $("input[name='currentPassword']")
        let newPswrd = $("input[name='newPassword']")
        let confirmPswrd = $("input[name='confirmPassword']")
        if(isFormValid(currentPswrd, newPswrd, confirmPswrd)){
            UpdatePassword(currentPswrd.val(), newPswrd.val())
        }
        
    })

    $("#cancelEdit").on('click', function(){
        clearInputClassError()
        fadeAlertMsg()
    })

    $('.deconnect-link').on('click', function () {
        sessionStorage.clear()
        $(location).attr('href', "login")
    })

})

function UpdatePassword(_currentPassword, _newPswrd) {
    $.ajax({
        type: "POST",
        data:{
            currentPswrd: _currentPassword,
            newPswrd: _newPswrd,
            RequestType: "UpdatePassword"
        },
        url: "MonCompte",
        cache: false,
        dataType: "json",
        success: function (data) {
            $.each(data, (index, response)=>{
                if(response.requestStatusCode == 200){
                    let inputs = $("input")
                    for(let i=0; i<inputs.length; i++){
                        if(inputs[i]){
                            inputs[i].value = ""
                        }
                    }
                    showAlert(response.sucessMsg)
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


function isFormValid(input1, input2, input3){
    clearInputClassError()

    let errorWrapper = $(".alert-wrapper")
    let errorMsg = $(".error-msg")

    if((input1.val() == "") && (input2.val() == "") && (input3.val() == "") ){
        animateForm(input1)
        animateForm(input2)
        animateForm(input3)

        displayErrorMsg(errorWrapper, errorMsg, "Ces champs sont obligatoires!")
        return false
    }

    else if(input1.val() == ""){
        animateForm(input1)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez rensigner le mot de passe actuel!")
        return false
    }

    else if(input2.val() == ""){
        animateForm(input2)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez rensigner le nouveau mot de passe!")
        return false
    }

    else if(input3.val() == ""){
        animateForm(input3)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez confirmer le nouveau mot de passe!")
        return false
    }

    else if(!isEqual(input2, input3)){
        animateForm(input2)
        animateForm(input3)
        displayErrorMsg(errorWrapper, errorMsg, "Le nouveau mot de passe différe de sa confirmation!")
        return false
    }
    else{
       
        return true
    }
}

function isEqual(input1, input2){
    if(input1.val() === input2.val()){
        return true
    }
    return false
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