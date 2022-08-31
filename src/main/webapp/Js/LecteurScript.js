$(document).ready(function (){
    $(".tablelistLecteur").dataTable({
        "aaSorting": [[0, 'desc']],
        "sPaginationType": "full_numbers",
        "oLanguage": {
            "sUrl": "assets/DataTables/dt-config-fr.txt"
        },
        dom: 'Blfrtip',
        buttons:[
            {
                extend: 'pdfHtml5',
                text: '<i class="fa fa-file-pdf"></i> Exporter',
                title: 'Liste des Lecteurs',
                filename: 'liste_lecteurs_'+new Date().format("yyyymmddhms"),
                exportOptions: {
                    columns: [ 0, 1, 2, 3]
                },
                customize: function (doc) {
                    doc.content[1].table.widths =
                        Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                    doc.styles.tableHeader.fillColor = '#093F76';
                    doc.styles.tableHeader.color = '#fff';

                    doc.styles.tableBodyEven.alignment = 'center';
                    doc.styles.tableBodyOdd.alignment = 'center';
                }
            }
        ]

    })

    $(".btn-close-LecteurDetailModal").click(function (){
        closeLecteurDetailModal()
    })
    $(".btn-close-LecteurEditmodal").click(function (){
        closeLecteurEditModal()
    })



    //ALERT
    $(".closeAlertSuccess").click(function () {
        closeAlertSuccess()
    })


    //ADD LECTEUR
    $("#addLecteur").click(function () {
        let readerName = $("input[name='readerNameToAdd']")
        let emailReader = $("input[name='readerEmailToAdd']")
        let fonctionReader = $("input[name='readerFonctionToAdd']")
        let mobileReader = $("input[name='readerMobileToAdd']")

        if(isFormValid(readerName, emailReader, fonctionReader, mobileReader)){
            fadeAlertMsg()
            addLecteur(readerName, emailReader, fonctionReader, mobileReader)
            console.log("no error")
        }
        else{
            console.log("error")
        }
    })

    $("#cancelAdd").click(function () {
        clearInputClassError()
        fadeAlertMsg()
    })

    //UPDATE LECTEUR
    $("#editLecteur").click(function (){
        let readerName = $("input[name='readerName']")
        let emailReader = $("input[name='readerEmail']")
        let fonctionReader = $("input[name='readerFonction']")
        let mobileReader = $("input[name='readerMobile']")

        if(isFormValid(readerName, emailReader, fonctionReader, mobileReader)){
            fadeAlertMsg()
            updateLecteur(readerName, emailReader, fonctionReader, mobileReader)
            console.log("no error")
        }
        else{
            console.log("error")
        }
    })

    $("#cancelEdit").click(function (){
        closeLecteurEditModal()
    })

    //RECHERCHE
    $("#searchLecteur").click(function(){
        let searchParams = []
        searchParams.push($("input[name='nomLecteurSearch']").val(), $("input[name='fonctionLeacteurSearch']").val(), $("input[name='mobileLeacteurSearch']").val())
        $(".tablelistLecteur").DataTable().column(1).search(searchParams[0]).column(2).search(searchParams[1]).column(3).search(searchParams[2]).draw()
    })
    $("#reinitialiserLecteurSearch").click(function () {
        $(".tablelistLecteur").DataTable().column(1).search("").column(2).search("").column(3).search("").draw()
    })


    //form filled
    $(".text").on("input", function (e) {
        let validatedValue = ""
        if(e.target.type === "text"){
            validatedValue = e.target.value.replace(/[^\D]/, "");

            e.target.value = validatedValue
        }
    })

    $("input[type='tel']").on("input", function (e) {
        let validatedValue = ""
        if(e.target.type === "tel"){
            let num = e.target.value.replace(/[^\d]/, "");
            validatedValue = num;

            if(num.length == 10){
                const parts = num.match(/^\(?(\d{3})\D*(\d{2})\D*(\d{3})\D*(\d{2})$/);
                validatedValue = `${parts[1]} ${parts[2]} ${parts[3]} ${parts[4]}`;
            }
            else if(num.length > 10){
                validatedValue = num.replace(/\D/g, "")
            }
            e.target.value=validatedValue
        }
    })


});



function addLecteur(_readerName, _emailReader, _fonctionReader, _mobileReader){
    $.ajax({
        type: "POST",
        data:{
            nomLecteur: _readerName.val(),
            emailLecteur: _emailReader.val(),
            fonctionLecteur : _fonctionReader.val(),
            mobileLecteur : _mobileReader.val(),
            RequestType: "AddLecteur"
        },
        url: "add_Lecteur",
        cache: false,
        dataType: "json",
        success: function (data) {
            $.each(data, (index, response)=>{
                if(response.requestStatusCode == 201){
                    let inputs = $("input")
                    for(let i=0; i<inputs.length; i++){
                            inputs[i].value = ""
                    }
                    showAlert(response.sucessMsg)
                }
            })
        }
    })
}

function updateLecteur(_readerName, _emailReader, _fonctionReader, _mobileReader){
    let IndexLecteurToUpdate = $("input[name='IdLecteur']").val()

    $.ajax({
        type: "POST",
        data:{
            IdLecteur: IndexLecteurToUpdate,
            nomLecteur: _readerName.val(),
            emailLecteur: _emailReader.val(),
            fonctionLecteur : _fonctionReader.val(),
            mobileLecteur : _mobileReader.val(),
            RequestType: "UpdateLecteur"
        },
        url: "list_Lecteur",
        cache: false,
        dataType: "json",
        success: function (data) {
            $.each(data, (index, response)=>{
                if(response.requestStatusCode == 200) {
                    let row = $("#row"+IndexLecteurToUpdate+"")
                    let Action = '<div class="tableListLecteur-button-group">'+
                                    '<button type="button" class="tableListLecteur-btn-item" onclick="getDetailLecteur('+ IndexLecteurToUpdate +')" ><span><i class="fa fa-search"></i></span> Voir details</button>'+
                                    '<button type="button" class="tableListLecteur-btn-item" onclick="initUpdateLecteur('+ IndexLecteurToUpdate +')"><span><i class="fa fa-user-edit"></i></span>Modifier</button>'+
                                    '<button type="button" class="tableListLecteur-btn-item" onclick="deleteLecteur('+ IndexLecteurToUpdate +')"><span><i class="fa fa-times"></i></span>Supprimer</button>'+
                                '</div>'
                    let newData = ["LEC-"+IndexLecteurToUpdate, _readerName.val(), _fonctionReader.val(), _mobileReader.val(), Action]

                    $(".tablelistLecteur").DataTable().row(row).data(newData).draw(false)
                    closeLecteurEditModal()
                    showAlert(response.sucessMsg)
                }
            })
        }
    })
}

function initUpdateLecteur(idLecteur){
    $.ajax({
        type: "POST",
        data:{
            IdLecteur : idLecteur,
            RequestType: "getLecteurById"
        },
        url: "list_Lecteur",
        cache: false,
        dataType: "json",
        success: function (data) {
            $.each(data, (index, response)=>{
                showLecteurEditModal()
                $("#modal-title-editLecteur").text("Modification du Lecteur N°"+ response.Id)
                $("input[name='IdLecteur']").val(response.Id)
                $("input[name='readerName']").val(response.Nom_Lecteur)
                $("input[name='readerEmail']").val(response.Email)
                $("input[name='readerFonction']").val(response.Fonction)
                $("input[name='readerMobile']").val(response.Mobile)
            })
        }
    })
}

function getDetailLecteur(idLecteur){
    $.ajax({
        type: "POST",
        data:{
            IdLecteur : idLecteur,
            RequestType: "getLecteurById"
        },
        url: "list_Lecteur",
        cache: false,
        dataType: "json",
        success: function (data) {
            $.each(data, (index, response)=>{
                showLecteurDetailModal()
                $("#modal-title-detailLecteur").text("Fiche de renseignement pour le lecteur n°"+response.Id+" :")
                $("#detail-nomLecteur").text(response.Nom_Lecteur)
                $("#detail-fonctionLecteur").text(response.Fonction)
                $("#detail-emailLecteur").text(response.Email)
                $("#detail-mobileLecteur").text(response.Mobile)
                $("#detail-nbLivre").text(response.NbFoisPret)
                $("#detail-amendeLecteur").text(response.Amende_Lecteur +" fmg")

            })
        }
    })
}


function deleteLecteur(IdLecteur){
    if(confirm("Voulez-vous supprimer le lecteur `LEC/"+IdLecteur+"` de E-NDRANA?")){
        $.ajax({
            type: "POST",
            data: {
                Id_Lecteur: IdLecteur,
                RequestType: "DeleteLecteur"
            },
            url: "list_Lecteur",
            cache: false,
            dataType: "json",
            success:function (data) {
                $.each(data, (index, response)=>{
                    if(response.requestStatusCode == 204){
                        let row = $("#row"+IdLecteur+"")
                        $("table").dataTable().fnDeleteRow(row)
                        showAlert(response.sucessMsg)

                    }
                })
            }
        })
    }
}

function showLecteurDetailModal(){
    if ($(".modalPopUp.modalDeatilLecteurPopUp").hasClass("fade")) {
        $(".modalPopUp.modalDeatilLecteurPopUp").removeClass("fade")
        $(".modalPopUp.modalDeatilLecteurPopUp").addClass("show")
    } else {
        $(".modalPopUp.modalDeatilLecteurPopUp").addClass("show")
    }

    $(".modal-shadow").addClass("open")
    $("body").addClass("modal-open")
}

function closeLecteurDetailModal(){
    $(".modalPopUp.modalDeatilLecteurPopUp").addClass("fade")
    $(".modal-shadow").removeClass("open")
    $("body").removeClass("modal-open")
}


function showLecteurEditModal(){
    clearInputClassError()
    fadeAlertMsg()
    if ($(".modalPopUp.modalEditLecteurPopUp").hasClass("fade")) {
        $(".modalPopUp.modalEditLecteurPopUp").removeClass("fade")
        $(".modalPopUp.modalEditLecteurPopUp").addClass("show")
    } else {
        $(".modalPopUp.modalEditLecteurPopUp").addClass("show")
    }

    $(".modal-shadow").addClass("open")
    $("body").addClass("modal-open")
}

function closeLecteurEditModal(){
    $(".modalPopUp.modalEditLecteurPopUp").addClass("fade")
    $(".modal-shadow").removeClass("open")
    $("body").removeClass("modal-open")
}


function showAlert(alertMsg){
    if ($(".alert-success").hasClass("disappered")) {
        $(".alert-success").removeClass("disappered");
        $(".alert-success").addClass("displayed");

    }

    $(".alertmsg").text(alertMsg)
    $(".alert-success").addClass("displayed")

    setTimeout(() => {
        $(".alert-success").removeClass("displayed")
        $(".alert-success").addClass("disappered")
    }, 5000)

    clearInterval()
}

function closeAlertSuccess(){
    $(".alert-success").removeClass("displayed")
    $(".alert-success").addClass("disappered")
}


/* GESTION DES ERREURS */
function animateForm(input){
    input.addClass("incorrect")
    input.css('animation', "bounce-in 1.15s ease")
    input.on('animationend', function(){
        input.css('animation', "")
    })
}


function isFormValid(input1, input2, input3, input4){
    clearInputClassError()

    let errorWrapper = $(".alert-wrapper")
    let errorMsg = $(".error-msg")

    if((input1.val() == "") && (input3.val() == "") && (input4.val() == "") ){
        animateForm(input1)
        animateForm(input3)
        animateForm(input4)

        displayErrorMsg(errorWrapper, errorMsg, "Ces champs sont obligatoires!")
        return false
    }

    else if(input1.val() == ""){
        animateForm(input1)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez renseigner le nom du Lecteur!")
        return false
    }

    else if(input3.val() == ""){
        animateForm(input3)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez renseigner la fonction exercée par le Lecteur!")
        return false
    }

    else if(input4.val() == ""){
        animateForm(input4)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez renseigner le mobile du Lecteur!")
        return false
    }

    else if(input2.val()!= "" && !isValidEMail(input2.val())){
        animateForm(input2)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez renseigner une adresse éléctronique valide!")
        return false
    }
    else if(input4.val()!= "" && !isMobileValid(input4.val())){
        animateForm(input4)
        displayErrorMsg(errorWrapper, errorMsg, "Le numero est incorrect!!")
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


function isValidEMail(email){
    const emailRegEx = /^[A-Za-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/

    if(emailRegEx.test(email)){
        return true;
    }
    return false
}

function isMobileValid(usermobile){
    const phoneRegEx = /^(03[2-4]) (\d{2}) (\d{3}) (\d{2})$/
    if(phoneRegEx.test(usermobile)){
        return true
    }else{
        return false
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
