$(document).ready(function (){
    $(".tablelistLecteur").dataTable({
        dom: 'Blfrtip',
        "aaSorting": [[0, 'desc']],
        "sPaginationType": "full_numbers",

        "oLanguage": {
            "sUrl": "assets/DataTables/dt-config-fr.txt"
        }
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
        addLecteur()
    })

    //UPDATE LECTEUR
    $("#editLecteur").click(function (){
        updateLecteur()
    })

    $("#cancelEdit").click(function (){
        closeLecteurEditModal()
    })

    //RECHERCHE
    $("#searchLecteur").click(function(){
        let searchParams = []
        searchParams.push($("input[name='nomLecteurSearch']").val(), $("input[name='fonctionLeacteurSearch']").val(), $("input[name='mobileLeacteurSearch']").val())
        console.log(searchParams)
        $(".tablelistLecteur").DataTable().column(1).search(searchParams[0]).column(2).search(searchParams[1]).column(3).search(searchParams[2]).draw()
    })
    $("#reinitialiserLecteurSearch").click(function () {
        $(".tablelistLecteur").DataTable().column(1).search("").column(2).search("").column(3).search("").draw()
    })


    //form filled
    $("input[type='text']").on("input", function (e) {
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



function addLecteur(){
    let readerName = $("input[name='readerNameToAdd']").val()
    let emailReader = $("input[name='readerEmailToAdd']").val()
    let fonctionReader = $("input[name='readerFonctionToAdd']").val()
    let mobileReader = $("input[name='readerMobileToAdd']").val()
    $.ajax({
        type: "POST",
        data:{
            nomLecteur: readerName,
            emailLecteur: emailReader,
            fonctionLecteur : fonctionReader,
            mobileLecteur : mobileReader,
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
                        if(inputs[i].type == "text"){
                            inputs[i].value = ""
                        }
                    }
                    showAlert(response.sucessMsg)
                }
            })
        }
    })
}

function updateLecteur(){
    let IndexLecteurToUpdate = $("input[name='IdLecteur']").val()
    let readerName = $("input[name='readerName']").val()
    let emailReader = $("input[name='readerEmail']").val()
    let fonctionReader = $("input[name='readerFonction']").val()
    let mobileReader = $("input[name='readerMobile']").val()
    $.ajax({
        type: "POST",
        data:{
            IdLecteur: IndexLecteurToUpdate,
            nomLecteur: readerName,
            emailLecteur: emailReader,
            fonctionLecteur : fonctionReader,
            mobileLecteur : mobileReader,
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
                    let newData = ["LEC-"+IndexLecteurToUpdate, readerName, fonctionReader, mobileReader, Action]

                    $(".tablelistLecteur").DataTable().row(row).data(newData).draw(false)
                    closeLecteurEditModal()
                    setTimeout(()=> { showAlert(response.sucessMsg) }, 500)
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
                        setTimeout(()=> { showAlert(response.sucessMsg) }, 100)

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