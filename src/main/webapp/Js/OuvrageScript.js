$(document).ready(function () {
    $("#dateEdition_InputField").datepicker({
        dateFormat: "dd/mm/yyyy"
    })
    $("#dateEditionToEdit_InputField").datepicker({
        dateFormat: "dd/mm/yyyy"
    })
    $(".tablelistOuvrage").dataTable({
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
                title: 'Liste des Ouvrages',
                filename: 'liste_ouvrages_'+new Date().format("yyyymmddhms"),
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4]
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

    $(".btn-close-BookDetailmodal").click(function (){
        closeBookDetailModal()
    })

    $(".btn-close-BookEditmodal").click(function (){
        closeBookEditModal()
    })

    $("#cancelEdit").click(function () {
        closeBookEditModal()
    })

    //ALERT
    $(".closeAlertSuccess").click(function () {
        closeAlertSuccess()
    })

    //ADD BOOK
    $("#addBook").click(function (){
        let newTitleBook = $("input[name='titleBookToAdd']")
        let newAuthorName = $("input[name='AuthorNameToAdd']")
        let newDateEdition = $("input[name='dateEditionToAdd']")

        if(isFormValid(newTitleBook, newAuthorName, newDateEdition)){
            fadeAlertMsg()
            addOuvrage(newTitleBook, newAuthorName, newDateEdition)
        }
    })

    $("#cancelAdd").click(function () {
        clearInputClassError()
        fadeAlertMsg()
    })

    //UPDATE BOOK
    $("#editBook").click(function () {
        let _titleBook = $("input[name='titleBook']")
        let _authorName = $("input[name='authorBook']")
        let _dateedition = $("input[name='dateEditionBook']")
        if(isFormValid(_titleBook, _authorName, _dateedition)){
            updateBook()
        }
    })

    //RECHERCHE
    $("#searchBook").click(function(){
        let searchParams = []
        searchParams.push($("input[name='titreOuvrageSearch']").val(), $("input[name='nomAuteurSearch']").val())
        console.log(searchParams)
        $(".tablelistOuvrage").DataTable().column(1).search(searchParams[0]).column(2).search(searchParams[1]).draw()
    })

    $("#reinitialiserOuvrageSearch").click(function () {
        $(".tablelistOuvrage").DataTable().column(1).search("").column(2).search("").draw()
    })

})

function addOuvrage(_newTitleBook, _newAuthorName, _newDateEdition){
    $.ajax({
        type: "POST",
        data: {
            titleBook : _newTitleBook.val(),
            authorName : _newAuthorName.val(),
            dateEdtion : _newDateEdition.val(),
            RequestType: "AddOuvrage"
        },
        url: "add_Ouvrage",
        cache: false,
        dataType: "json",
        success: function (data){
            $.each(data, (index, response)=>{
                if(response.requestStatusCode == 201){
                    let inputs = $("input")
                    for(let i=0; i<inputs.length; i++){
                        if(inputs[i].type == "text"){
                            inputs[i].value = ""
                        }
                    }
                    showSuccessAlert(response.sucessMsg)
                }
            })
        }
    })
}


function initUpdateLivre(IdOuvrage){
    $.ajax({
        type: "POST",
        data:{
            Id_Ouvrage : IdOuvrage,
            RequestType : "getBookById"
        },
        url: "list_Ouvrage",
        cache: false,
        dataType: "json",
        success: function (data) {
            $.each(data, (index, response)=>{
                showBookEditModal()
                $("#modal-title-editOuvrage").text("Modification de l'Ouvrage N°"+response.Id_Ouvrage+" :")
                $("input[name='IdOuvrage']").val(response.Id_Ouvrage)
                response.Disponible ? $("input[name='status']").val("Oui") : $("input[name='status']").val("Non")
                $("input[name='titleBook']").val(response.Titre_Ouvrage)
                $("input[name='authorBook']").val(response.Nom_Auteur)
                $("#dateEditionToEdit_InputField").datepicker('setDate', new Date(response.Date_Edition))
            })
        }
    })
}

function updateBook(){
    let IndexBookToUpdate = $("input[name='IdOuvrage']").val()
    let statusBook = $("input[name='status']").val()
    let _titleBook = $("input[name='titleBook']").val()
    let _authorName = $("input[name='authorBook']").val()
    let _dateedition = $("input[name='dateEditionBook']").datepicker("getDate")
    $.ajax({
        type: "POST",
        data:{
            IdOuvrage: IndexBookToUpdate,
            titleBook: _titleBook,
            authorName: _authorName,
            dateEdition : new Date(_dateedition).format("dd/mm/yyyy"),
            RequestType: "UpdateBook"
        },
        url: "list_Ouvrage",
        cache: false,
        dataType: "json",
        success: function (data) {
            $.each(data, (index, response)=>{
                if(response.requestStatusCode == 200) {
                    let row = $("#row"+IndexBookToUpdate+"")
                    let Action = '<div class="tableListOuvrage-button-group">'+
                        '<button type="button" class="tableListOuvrage-btn-item" onclick="getDetailLivre('+ IndexBookToUpdate +')" ><span><i class="fa fa-search"></i></span> Voir details</button>'+
                        '<button type="button" class="tableListOuvrage-btn-item" onclick="initUpdateLivre('+ IndexBookToUpdate +')"><span><i class="fa fa-user-edit"></i></span>Modifier</button>'+
                        '<button type="button" class="tableListOuvrage-btn-item" onclick="deleteLivre('+ IndexBookToUpdate +')"><span><i class="fa fa-times"></i></span>Supprimer</button>'+
                        '</div>'
                    let dateEditionBook = new Date(_dateedition).format("yyyy-mm-dd")
                    let newData = ["L-"+IndexBookToUpdate, _titleBook, _authorName, dateEditionBook, statusBook, Action]

                    $(".tablelistOuvrage").DataTable().row(row).data(newData).draw(false)
                    closeBookEditModal()
                    showSuccessAlert(response.sucessMsg)
                }
            })
        }
    })
}


function getDetailLivre(IdOuvrage){
    $.ajax({
        type: "POST",
        data:{
            Id_Ouvrage : IdOuvrage,
            RequestType : "getBookById"
        },
        url: "list_Ouvrage",
        cache: false,
        dataType: "json",
        success: function (data) {
            $.each(data, (index, response)=>{
                showBookDetailModal()
                $("#modal-title-detailOuvrage").text("Fiche de renseignement pour l'Ouvrage n°"+response.Id_Ouvrage+" :")
                $("#detail-titlebook").text(response.Titre_Ouvrage)
                $("#detail-authorName").text(response.Nom_Auteur)
                $("#detail-dateEdition").text(new Date(response.Date_Edition).format("dd/mm/yyyy"))
                response.Disponible ? $("#detail-disponible").text("Oui") : $("#detail-disponible").text("Non")
                $("#detail-nbFoisPret").text(response.NbFoisPret)

            })
        }
    })
}


function deleteLivre(IdBook){
    if(confirm("Voulez-vous supprimer l'Ouvarge `L/"+IdBook+"` de E-NDRANA?")){
        $.ajax({
            type: "POST",
            data: {
                Id_Ouvrage: IdBook,
                RequestType: "DeleteBook"
            },
            url: "list_Ouvrage",
            cache: false,
            dataType: "json",
            success:function (data) {
                $.each(data, (index, response)=>{
                    if(response.requestStatusCode == 204){
                        let row = $("#row"+IdBook+"")
                        $(".tablelistOuvrage").dataTable().fnDeleteRow(row)
                        showSuccessAlert(response.sucessMsg)
                    }
                })
            }
        })
    }
}


function showBookDetailModal(){
    if ($(".modalPopUp.modalDetailOuvragePopUp").hasClass("fade")) {
        $(".modalPopUp.modalDetailOuvragePopUp").removeClass("fade")
        $(".modalPopUp.modalDetailOuvragePopUp").addClass("show")
    } else {
        $(".modalPopUp.modalDetailOuvragePopUp").addClass("show")
    }

    $(".modal-shadow").addClass("open")
    $("body").addClass("modal-open")
}

function closeBookDetailModal(){
    $(".modalPopUp.modalDetailOuvragePopUp").addClass("fade")
    $(".modal-shadow").removeClass("open")
    $("body").removeClass("modal-open")
}


function showBookEditModal(){
    clearInputClassError()
    fadeAlertMsg()
    if ($(".modalPopUp.modalEditOuvragePopUp").hasClass("fade")) {
        $(".modalPopUp.modalEditOuvragePopUp").removeClass("fade")
        $(".modalPopUp.modalEditOuvragePopUp").addClass("show")
    } else {
        $(".modalPopUp.modalEditOuvragePopUp").addClass("show")
    }

    $(".modal-shadow").addClass("open")
    $("body").addClass("modal-open")
}

function closeBookEditModal(){
    $(".modalPopUp.modalEditOuvragePopUp").addClass("fade")
    $(".modal-shadow").removeClass("open")
    $("body").removeClass("modal-open")
}

function showSuccessAlert(alertMsg){
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
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez renseigner le titre de l'Ouvrage!")
        return false
    }

    else if(input2.val() == ""){
        animateForm(input2)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez renseigner le nom de l'auteur de l'Ouvrage!")
        return false
    }

    else if(input3.val() == ""){
        animateForm(input3)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez renseigner la date d'edition de l'Ouvrage!")
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


function isDateValid(date){

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
