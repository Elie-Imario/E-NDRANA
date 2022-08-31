$(document).ready(function(){
    let dateDebut = new Date();
    let dateFin = new Date();

    $("#datedebutPret_InputField").datepicker({
        dateFormat: "dd/mm/yyyy"
    }).on('changeDate', function(selected) {
        dateDebut = new Date(selected.date.valueOf());
        dateDebut.setDate(dateDebut.getDate(new Date(selected.date.valueOf())));
        $('#datefinPret_InputField').datepicker('setStartDate', dateDebut);
    });
    $("#datefinPret_InputField").datepicker({
        dateFormat: "dd/mm/yyyy"
    }).on('changeDate', function(selected) {
        dateFin = new Date(selected.date.valueOf());
        dateFin.setDate(dateFin.getDate(new Date(selected.date.valueOf())));
        $('#datedebutPret_InputField').datepicker('setEndDate', dateFin);
    });


    /** DatePicker in Modal Add Pret **/

    $("#datedebutPretToAdd_InputField").datepicker({
        dateFormat: "dd/mm/yyyy"
    }).on('changeDate', function(selected) {
        dateDebut = new Date(selected.date.valueOf());
        dateDebut.setDate(dateDebut.getDate(new Date(selected.date.valueOf())));
        $('#datefinPretToAdd_InputField').datepicker('setStartDate', dateDebut);

        if($("#datefinPretToAdd_InputField").val() == ""){
            let datefin = null
        }
        else{
            let datefin = $("#datefinPretToAdd_InputField").datepicker("getDate")

            let nbJour = differenceBetweenDate(dateDebut, datefin)
            console.log(nbJour)
            $("input[name='nbJourPrettoAdd']").val(nbJour)
            if(nbJour>7){
                $(".warning-Alert").fadeIn("slow")
            }else{
                $(".warning-Alert").fadeOut("1000")
            }

        }
    });


    $("#datefinPretToAdd_InputField").datepicker({
        dateFormat: "dd/mm/yyyy"
    }).on('changeDate', function(selected) {
        dateFin = new Date(selected.date.valueOf());
        dateFin.setDate(dateFin.getDate(new Date(selected.date.valueOf())));
        $('#datedebutPretToAdd_InputField').datepicker('setEndDate', dateFin);

        if($("#datedebutPretToAdd_InputField").val() == ""){
            let datedeb = null
        }
        else{
            let datedebut = $("#datedebutPretToAdd_InputField").datepicker("getDate")

            let nbJour = differenceBetweenDate(datedebut, dateFin)
            $("input[name='nbJourPrettoAdd']").val(nbJour)
            console.log(nbJour)
            if(nbJour>7){
                $(".warning-Alert").fadeIn("slow")
            }else{
                $(".warning-Alert").fadeOut("1000")
            }
        }

    });


    /** DatePicker in Modal Edit Pret **/
    $("#datedebutPretToEdit_InputField").datepicker({
        dateFormat: "dd/mm/yyyy"
    }).on('changeDate', function(selected) {
        dateDebut = new Date(selected.date.valueOf());
        dateDebut.setDate(dateDebut.getDate(new Date(selected.date.valueOf())));
        $('#datefinPretToEdit_InputField').datepicker('setStartDate', dateDebut);

        if($("#datefinPretToAdd_InputField").val() == ""){
            let datefin = null
        }
        else{
            let datefin = $("#datefinPretToEdit_InputField").datepicker("getDate")

            let nbJour = differenceBetweenDate(dateDebut, datefin)
            $("input[name='nbJourPret']").val(nbJour)
            if(nbJour>7){
                $(".alert-editPret .warning-msg").text("Le nombre de jour de prêt est plus de 7jours, Le lecteur sera facturé de 5000 Fmg d'amende!")
                $(".warning-Alert.alert-editPret").fadeIn("slow")
            }else{
                $(".warning-Alert").fadeOut("1000")
            }

        }
    });

    $("#datefinPretToEdit_InputField").datepicker({
        dateFormat: "dd/mm/yyyy"
    }).on('changeDate', function(selected) {
        dateFin = new Date(selected.date.valueOf());
        dateFin.setDate(dateFin.getDate(new Date(selected.date.valueOf())));
        $('#datedebutPretToEdit_InputField').datepicker('setEndDate', dateFin);

        if($("#datedebutPretToEdit_InputField").val() == ""){
            let datedeb = null
        }
        else{
            let datedebut = $("#datedebutPretToEdit_InputField").datepicker("getDate")

            let nbJour = differenceBetweenDate(datedebut, dateFin)
            $("input[name='nbJourPret']").val(nbJour)
            if(nbJour>7){
                $(".alert-editPret .warning-msg").text("Le nombre de jour de prêt est plus de 7jours, Le lecteur sera facturé de 5000 Fmg d'amende!")
                $(".warning-Alert.alert-editPret").fadeIn("slow")
            }else{
                $(".warning-Alert").fadeOut("1000")
            }
        }

    });

    $(".tablelistPret").dataTable({
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
                title: 'Liste des Prêts',
                filename: 'liste_prêts_' + new Date().format("yyyymmddhms"),
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                },
                customize: function (doc) {
                    doc.styles.tableHeader.fillColor = '#093F76';
                    doc.styles.tableHeader.color = '#fff';

                    doc.styles.tableBodyEven.alignment = 'center';
                    doc.styles.tableBodyOdd.alignment = 'center';
                }
            }
        ]
    })



    /** AutoComplete **/
    let readerNameOptions = getReaderName()
    $("#readerNameToAdd_InputField").autocomplete({
        lookup: readerNameOptions
    })

    let titleBookOptions = getTitleBook()
    $("#titleBookToAdd_InputField").autocomplete({
        lookup: titleBookOptions
    })

    $("#titleBookToEdit_InputField").autocomplete({
        lookup: titleBookOptions
    })


    //ADD PRET
    $("#addPretbtn").click(function(){
        showPretAddModal()
    })

    $("#addPret").click(function() {
        let readername = $("input[name='readerNametoAdd']")
        let titlebook = $("input[name='titleBooktoAdd']")
        let datedebutpret = $("input[name='datedebutPrettoAdd']")
        let datefinpret = $("input[name='datefinPrettoAdd']")
        if(isAddFormValid(readername, titlebook, datedebutpret, datefinpret)){
            fadeAlertMsg()
            EffectuerPret()
        }
    })

    $(".btn-close-addPret").click(function() {
        fadeAlertMsg()
        closePretAddModal()
    })

    $("#cancelAdd").click(function () {
        fadeAlertMsg()
        closePretAddModal()
    })

    //UPDATE PRET

    $("#editPret").click(function () {
        let _titleBook = $("input[name='titleBook']")
        let _datedeb = $("input[name='datedebutPret']")
        let _datefin = $("input[name='datefinPret']")

        if(isEditFormValid(_titleBook, _datedeb, _datefin)){
            fadeAlertMsg()
            UpdatePret()
        }
    })

    $(".btn-close-EditPret").click(function() {
        fadeAlertMsg()
        closePretEditModal()
    })

    $("#cancelEdit").click(function () {
        fadeAlertMsg()
        closePretEditModal()
    })
    //ALERT
    $(".closeAlertSuccess").click(function () {
        closeAlertSuccess()
    })


    //RECHERCHE
    $("#searchPret").click(function(){
        let searchParams = []
        let _datedebParams, _datefinParams, datedebParams, datefinParams

        clearArray($.fn.dataTable.ext.search)

        if(($("input[name='datedebutPretSearch']").val() == "") && ($("input[name='datefinPretSearch']").val() == "")){
            datedebParams = ""
            datefinParams = ""

            searchParams.push($("input[name='numeroPretSearch']").val(), $("input[name='nomLecteurSearch']").val(), datedebParams, datefinParams, $("input[name='titreOuvrageSearch']").val())
            $(".tablelistPret").DataTable().column(0).search(searchParams[0]).column(1).search(searchParams[4]).column(2).search(searchParams[1]).column(3).search(searchParams[2]).column(4).search(searchParams[3]).draw()
        }
        else if(($("input[name='datedebutPretSearch']").val() != "") && ($("input[name='datefinPretSearch']").val() == "")){
            _datedebParams = $("input[name='datedebutPretSearch']").datepicker('getDate')

            datedebParams = new Date(_datedebParams).format("yyyy-mm-dd")
            datefinParams = ""

            searchParams.push($("input[name='numeroPretSearch']").val(), $("input[name='nomLecteurSearch']").val(), datedebParams, datefinParams, $("input[name='titreOuvrageSearch']").val())
            $(".tablelistPret").DataTable().column(0).search(searchParams[0]).column(1).search(searchParams[4]).column(2).search(searchParams[1]).column(3).search(searchParams[2]).column(4).search(searchParams[3]).draw()
        }

        else if(($("input[name='datedebutPretSearch']").val() == "") && ($("input[name='datefinPretSearch']").val() != "")){
            _datefinParams = $("input[name='datefinPretSearch']").datepicker('getDate')
            datedebParams = ""
            datefinParams = new Date(_datefinParams).format("yyyy-mm-dd")

            searchParams.push($("input[name='numeroPretSearch']").val(), $("input[name='nomLecteurSearch']").val(), datedebParams, datefinParams, $("input[name='titreOuvrageSearch']").val())
            $(".tablelistPret").DataTable().column(0).search(searchParams[0]).column(1).search(searchParams[4]).column(2).search(searchParams[1]).column(3).search(searchParams[2]).column(4).search(searchParams[3]).draw()
        }

        else{
            _datedebParams = $("input[name='datedebutPretSearch']").datepicker('getDate')
            _datefinParams = $("input[name='datefinPretSearch']").datepicker('getDate')

            $.fn.dataTable.ext.search.push(
                function( settings, data, dataIndex ) {
                    var min = _datedebParams;
                    var max = _datefinParams;
                    var date = new Date( data[4] );

                    if (( min <= date && date <= max )) {
                        return true;
                    }
                    return false;
                }
            );
            searchParams.push($("input[name='numeroPretSearch']").val(), $("input[name='nomLecteurSearch']").val(), $("input[name='titreOuvrageSearch']").val())
            $(".tablelistPret").DataTable().column(0).search(searchParams[0]).column(1).search(searchParams[2]).column(2).search(searchParams[1]).draw()
        }
    })
    $("#reinitialiserPretSearch").click(function () {
        console.log($.fn.dataTable.ext.search.length)
        clearArray($.fn.dataTable.ext.search)
        $(".tablelistPret").DataTable().column(0).search("").column(1).search("").column(2).search("").column(3).search("").column(4).search("").draw()
    })

    $(".text").on("input", function (e) {
        let validatedValue = ""
        if(e.target.type === "text"){
            validatedValue = e.target.value.replace(/[^\D]/, "");

            e.target.value = validatedValue
        }
    })
})

function clearArray(array) {
    while (array.length > 0) {
        array.pop();
    }
}

function initUpdatePret(idPret){
    $.ajax({
        type: "POST",
        data:{
            Id_Pret: idPret,
            RequestType : "getPretById"
        },
        url: "list_Pret",
        cache: false,
        dataType: "json",
        success: function (data) {
            $.each(data, (index, response)=>{
                $("#modal-title-editPret").text("Modification du pret N°"+response.Id_Pret)
                response.Amende == 5000 ? $(".alert-editPret .warning-msg").text("Ce prêt est actuellement facturé de 5000 fmg d'amende.") : $(".alert-editPret .warning-msg").text("Ce prêt n'est soumise a aucune amende actuellement.")
                $(".warning-Alert.alert-editPret").fadeIn("slow")
                $("input[name='IdPret']").val(response.Id_Pret)
                $("input[name='IdLecteur']").val(response.Id_Lecteur)
                $("input[name='IdOuvrage']").val(response.Id_Ouvrage)
                $("input[name='CurrentNbJourPret']").val(response.NbJourPret)
                $("input[name='CurrentAmendePret']").val(response.Amende)
                $("select[name='etatPret']").val("")
                response.Etat ? $("option[value='1']").attr("selected", "selected") : $("option[value='0']").attr("selected", "selected")
                $("select[name='etatPret']").val($("option[selected='selected']").val())

                $("input[name='readerName']").val(response.Nom_Lecteur)
                $("input[name='titleBook']").val(response.Titre_Ouvrage)
                $("input[name='datedebutPret']").datepicker('setDate', new Date(response.DateDebPret))
                $("input[name='datedebutPret']").datepicker('setEndDate', new Date(response.DateFinPret))
                $("input[name='datefinPret']").datepicker('setDate', new Date(response.DateFinPret))
                $("input[name='datefinPret']").datepicker('setStartDate', new Date(response.DateDebPret))
                $("input[name='nbJourPret']").val(response.NbJourPret)

                showPretEditModal()
            })
        }
    })
}


function differenceBetweenDate(dateDeb, DateEnd){
    let result = (new Date(DateEnd).getTime() - new Date(dateDeb).getTime())/(24*60*60*1000)
    return result
}


function getReaderName(input){
    let readerNameresult = []
    $.ajax({
        type: "POST",
        data: {
            RequestType: "GetReaderName"
        },
        url: "list_Pret",
        async: true,
        cache: false,
        dataType: 'json',
        success: function (data) {
            $.each(data, (index, response)=>{
                readerNameresult.push({'value' : response})
            })

        }
    });
    return readerNameresult
}

function getTitleBook(){
    let resultTitleBook = []
    $.ajax({
        type: "POST",
        data: {
            RequestType: "GetTitleBook"
        },
        url: "list_Pret",
        async: true,
        cache: false,
        dataType: 'json',
        success: function (data) {
            $.each(data, (index, response)=>{
                resultTitleBook.push({'value' : response})
            })

        }
    });
    return resultTitleBook
}


function EffectuerPret(){
    let _readername = $("input[name='readerNametoAdd']").val()
    let _titlebook = $("input[name='titleBooktoAdd']").val()
    let _datedebutpret = $("input[name='datedebutPrettoAdd']").val()
    let _datefinpret = $("input[name='datefinPrettoAdd']").val()
    let _nbJourPret = $("input[name='nbJourPrettoAdd']").val()


    $.ajax({
        type: "POST",
        data:{
            readername: _readername,
            titlebook: _titlebook,
            datedebutpret: _datedebutpret,
            datefinpret: _datefinpret,
            nbJourPret: _nbJourPret,
            RequestType: "EffectuerPret"
        },
        url: "list_Pret",
        cache: false,
        dataType: "json",
        success: function (data){
            $.each(data, (index, response)=> {
                if (response.requestStatusCode == 201) {
                    $.ajax({
                        type: "POST",
                        data:{
                            RequestType: "GetLastInsertPret"
                        },
                        url: "list_Pret",
                        cache: false,
                        dataType: "json",
                        success: function (data){
                            $.each(data, (index, response) => {
                                let _etatPret = response.Etat ? "En cours" : "Terminé"
                                let _action = '<div class="tableListPret-button-group">'+
                                    '<button type="button" class="tableListPret-btn-item" onclick="initUpdatePret('+ response.Id_Pret +')"><span><i class="fa fa-user-edit"></i></span>Modifier</button>'+
                                    '<button type="button" class="tableListPret-btn-item" onclick="deletePret('+ response.Id_Pret +')"><span><i class="fa fa-times"></i></span>Supprimer</button>'+
                                    '</div>'
                                let data = ["P/"+response.Id_Pret, response.Titre_Ouvrage, response.Nom_Lecteur, new Date(response.DateDebPret).format("yyyy-mm-dd"), new Date(response.DateFinPret).format("yyyy-mm-dd"), response.NbJourPret, _etatPret, response.Amende, _action ]

                                $(".tablelistPret").dataTable().fnAddData(data)
                            })
                        }
                    })
                    closePretAddModal()
                    let inputs = $("input")
                    for(let i=0; i<inputs.length; i++){
                        inputs[i].value = ""
                    }
                    showSuccessAlert(response.sucessMsg)
                }
            })
        }
    })
}

function UpdatePret() {
    let _idPret = $("input[name='IdPret']").val()
    let _currentnbJourPret = $("input[name='CurrentNbJourPret']").val()
    let _currentamendePret = $("input[name='CurrentAmendePret']").val()
    let _currentIdOuvrage = $("input[name='IdOuvrage']").val()
    let _etatPret = $("select[name='etatPret']").val()
    let _IdLecteur = $("input[name='IdLecteur']").val()
    let _readerName = $("input[name='readerName']").val()
    let _titleBook = $("input[name='titleBook']").val()
    let _datedeb = $("input[name='datedebutPret']").datepicker('getDate')
    let _datefin = $("input[name='datefinPret']").datepicker('getDate')
    let _nbJour = $("input[name='nbJourPret']").val()

    $.ajax({
        type: "POST",
        data:{
            idPret: _idPret,
            currentnbJourPret: _currentnbJourPret,
            currentAmende: _currentamendePret,
            currentIdOuvrageenPret: _currentIdOuvrage,
            newEtat: _etatPret,
            Id_Lecteur: _IdLecteur,
            newTitleBook: _titleBook,
            newDateDeb : new Date(_datedeb).format("dd/mm/yyyy"),
            newDatefin: new Date(_datefin).format("dd/mm/yyyy"),
            newNbJourPret: _nbJour,
            RequestType: "UpdatePret"
        },
        url: "list_Pret",
        cache: false,
        dataType: "json",
        success: function (data) {
            $.each(data, (index, response)=>{
                if (response.requestStatusCode == 200) {
                    let row = $("#row" + _idPret + "")
                    let Action
                    let EtatPret
                    if (_etatPret == 1) {
                        Action = '<div class="tableListPret-button-group">' +
                            '<button type="button" class="tableListPret-btn-item" onclick="initUpdatePret(' + _idPret + ')"><span><i class="fa fa-user-edit"></i></span>Modifier</button>' +
                            '<button type="button" class="tableListPret-btn-item" onclick="deletePret(' + _idPret + ')"><span><i class="fa fa-times"></i></span>Supprimer</button>' +
                            '</div>'
                        EtatPret = "En cours"
                    } else {
                        Action = '<div class="tableListPret-button-group">' +
                            '<button type="button" class="tableListPret-btn-item" onclick="deletePret(' + _idPret + ')"><span><i class="fa fa-times"></i></span>Supprimer</button>' +
                            '</div>'
                        EtatPret = "Terminé"

                    }

                    let datedebutpret = new Date(_datedeb).format("yyyy-mm-dd")
                    let datefinpret = new Date(_datefin).format("yyyy-mm-dd")
                    let AmendePret
                    _nbJour > 7 ?  AmendePret = 5000 :  AmendePret = 0
                    let newData = ["P/"+_idPret, _titleBook, _readerName, datedebutpret, datefinpret, _nbJour, EtatPret, AmendePret, Action]

                    $(".tablelistPret").DataTable().row(row).data(newData).draw(false)
                    closePretEditModal()


                    showSuccessAlert(response.sucessMsg)
                    //$(document).attr('href', "list_Pret")
                }
            })
        }
        
    })
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
function deletePret(IdPret){
    if(confirm("Voulez-vous supprimer le pret `L/"+IdPret+"`?")){
        $.ajax({
            type: "POST",
            data: {
                Id_Pret: IdPret,
                RequestType: "DeletePret"
            },
            url: "list_Pret",
            cache: false,
            dataType: "json",
            success:function (data) {
                $.each(data, (index, response)=>{
                    if(response.requestStatusCode == 204){
                        let row = $("#row"+IdPret+"")
                        $(".tablelistPret").dataTable().fnDeleteRow(row)
                        showSuccessAlert(response.sucessMsg)
                    }
                })
            }
        })
    }
}

function closeAlertSuccess(){
    $(".alert-success").removeClass("displayed")
    $(".alert-success").addClass("disappered")
}

function showPretAddModal(){
    clearInputClassError()
    fadeAlertMsg()
    if ($(".modalPopUp.modalAddPretPopUp").hasClass("fade")) {
        $(".modalPopUp.modalAddPretPopUp").removeClass("fade")
        $(".modalPopUp.modalAddPretPopUp").addClass("show")
    } else {
        $(".modalPopUp.modalAddPretPopUp").addClass("show")
    }

    $(".modal-shadow").addClass("open")
    $("body").addClass("modal-open")
}


function closePretAddModal(){
    $(".modalPopUp.modalAddPretPopUp").addClass("fade")
    $(".modal-shadow").removeClass("open")
    $("body").removeClass("modal-open")
}


function showPretEditModal(){
    clearInputClassError()
    fadeAlertMsg()
    if ($(".modalPopUp.modalEditPretPopUp").hasClass("fade")) {
        $(".modalPopUp.modalEditPretPopUp").removeClass("fade")
        $(".modalPopUp.modalEditPretPopUp").addClass("show")
    } else {
        $(".modalPopUp.modalEditPretPopUp").addClass("show")
    }

    $(".modal-shadow").addClass("open")
    $("body").addClass("modal-open")
}



function closePretEditModal(){
    $(".modalPopUp.modalEditPretPopUp").addClass("fade")
    $(".modal-shadow").removeClass("open")
    $("body").removeClass("modal-open")
}


/* GESTION DES ERREURS */
function animateForm(input){
    input.addClass("incorrect")
    input.css('animation', "bounce-in 1.15s ease")
    input.on('animationend', function(){
        input.css('animation', "")
    })
}


function isAddFormValid(input1, input2, input3, input4){
    clearInputClassError()

    let errorWrapper = $(".alert-wrapper")
    let errorMsg = $(".error-msg")

    if((input1.val() == "") && (input2.val() == "") && (input3.val() == "") && (input4.val() == "") ){
        animateForm(input1)
        animateForm(input2)
        animateForm(input4)
        animateForm(input3)

        displayErrorMsg(errorWrapper, errorMsg, "Ces champs sont obligatoires!")
        return false
    }

    else if(input3.val() == "" && input4.val() == ""){
        animateForm(input3)
        animateForm(input4)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez rensigner la date de debut et de la fin du prêt!")
        return false
    }
    else if(input1.val() == ""){
        animateForm(input1)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez renseigner le nom du Lecteur!")
        return false
    }
    else if(input2.val() == ""){
        animateForm(input2)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez renseigner le titre de l'Ouvrage!")
        return false
    }
    else if(input3.val() == ""){
        animateForm(input3)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez rensigner la date de debut du prêt!")
        return false
    }

    else if(input4.val() == ""){
        animateForm(input4)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez rensigner la date de la fin du prêt!")
        return false
    }
    else{

        return true
    }
}

function isEditFormValid(input1, input2, input3){
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

    else if(input2.val() == "" && input3.val() == ""){
        animateForm(input3)
        animateForm(input4)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez rensigner la date de debut et de la fin du prêt!")
        return false
    }

    else if(input1.val() == ""){
        animateForm(input1)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez renseigner le titre de l'Ouvrage!")
        return false
    }
    else if(input2.val() == ""){
        animateForm(input2)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez rensigner la date de debut du prêt!")
        return false
    }

    else if(input3.val() == ""){
        animateForm(input3)
        displayErrorMsg(errorWrapper, errorMsg, "Veuillez rensigner la date de la fin du prêt!")
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

