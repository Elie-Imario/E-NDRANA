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
        }
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
        addOuvrage()
    })

    //UPDATE BOOK
    $("#editBook").click(function () {
        updateBook()
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

function addOuvrage(){
    let newTitleBook = $("input[name='titleBookToAdd']").val()
    let newAuthorName = $("input[name='AuthorNameToAdd']").val()
    let newDateEdition = $("input[name='dateEditionToAdd']").val()

    $.ajax({
        type: "POST",
        data: {
            titleBook : newTitleBook,
            authorName : newAuthorName,
            dateEdtion : newDateEdition,
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
                    setTimeout(()=> { showSuccessAlert(response.sucessMsg) }, 500)
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
                        setTimeout(()=> { showAlert(response.sucessMsg) }, 100)

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