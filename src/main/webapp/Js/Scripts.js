$(document).ready(function(){
    $('#updatePassword').on('click', function () {
        let currentPswrd = $("input[name='currentPassword']").val()
        let newPswrd = $("input[name='newPassword']").val()
        let confirmPswrd = $("input[name='confirmPassword']").val()
        UpdatePassword(currentPswrd, newPswrd)
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