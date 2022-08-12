<%@include file="../components/Header.jsp"%>

<body>
<div class="modal-shadow"></div>
<section class="top-nav">
    <%@include file="../components/TopMenu.jsp"%>
</section>

<section class="sideBar-nav">
    <%@include file="../components/SideBarMenu.jsp"%>
</section>

<section class="main-container">
    <div class="container">
        <h1 class="title-lead">Pret - Liste des Prets</h1>

        <!-- Alert Section -->
        <div class="alert-container">
            <div class="alert-success">
                <div class="ico-alert"><span><i class="fa fa-bell"></i></span></div>
                <div class="alert-success-content">
                    <span class="close-btn closeAlertSuccess"><i class="fa fa-times-circle"></i></span>
                    <span class="alertmsg">
                    </span>
                </div>
            </div>
        </div>
        <!---->

        <!-- Filtre avancée -->
        <div class="filtreAvance-bloc" id="accordion3" role="tablist" aria-multiselectable="true">
            <div class="filtreAvance-content">
                <div class="heading-content" role="tab" id="headingOne">
                    <h4 class="content-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion3" href="#recherche3"
                           aria-expanded="true" aria-controls="collapseOne" title="Afficher/Masquer les filtres"
                           class="accordion-title collapsed">
                            <i class="fa fa-angle-right"></i><span>Filtre avancé</span>
                        </a>
                    </h4>
                </div>
                <div id="recherche3" class="collapse" role="tabpanel" aria-labelledby="headingOne">
                    <div class="content-body">
                        <form class="form-horizontal searchPretForm" id="searchPretForm">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label">Numéro Prêt : </label>
                                        <input type="text" class="form-control" name="numeroPretSearch"
                                               placeholder="P/Numéro Prêt">
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Lecteur : </label>
                                        <input type="text" class="form-control text" name="nomLecteurSearch"
                                               placeholder="Lecteur">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label">Date de Prêt : </label>
                                            <div class="input_group">
                                                <input type="text" class="form-control datedebutPret_InputField" id="datedebutPret_InputField" name="datedebutPretSearch" placeholder="Début">
                                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                            </div>
                                            <div class="input_group">
                                                <input type="text" class="form-control datefinPret_InputField" id="datefinPret_InputField" name="datefinPretSearch" placeholder="Fin">
                                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                            </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Titre de l'Ouvrage : </label>
                                        <input type="text" class="form-control" id="#titreOuvrage" name="titreOuvrageSearch"
                                               placeholder="Titre de l'Ouvrage">
                                    </div>
                                </div>
                            </div>
                            <div class="button_group">
                                <button class="btn-form" id="searchPret" type="button"
                                        title="Rechercher">
                                    <i class="fa fa-search"></i>
                                    Rechercher
                                </button>
                                <button type="reset" class="btn-form" id="reinitialiserPretSearch"
                                        title="Réinitialiser">
                                    <i class="fa fa-times"></i>
                                    Réinitialiser
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!---->

        <!-- TABLE LIST Pret -->
        <div class="tableContainer">
            <div class="button_group">
                <button class="btn-form addPretbtn" id="addPretbtn" type="button">
                    <i class="fa fa-plus"></i>
                    Effectuer un prêt
                </button>
                <button class="btn-form" id="exportListPretTopdf" type="button"
                        title="Exporter">
                    <i class="fa fa-file-pdf"></i>
                    Exporter
                </button>
            </div>
            <div class="panel-body">
                <div class="table-responsive">
                    <div id="divTabListPret" class="table-listPret">

                        <table class="table table-striped table-bordered table-responsive table-condensed tablelistPret">
                            <thead>
                            <tr class="">
                                <th scope="col" style="width:5%">N°Pret</th>
                                <th scope="col" style="width:20%">Titre de l'Ouvrage</th>
                                <th scope="col" style="width:20%">Nom du Lecteur</th>
                                <th scope="col" style="width:15%">Date début</th>
                                <th scope="col" style="width:10%">Date fin</th>
                                <th scope="col" style="width:10%">Durée Prêt</th>
                                <th scope="col" style="width:10%">Etat</th>
                                <th scope="col" style="width:20px!important">Amende</th>
                                <th scope="col" style="width:25%">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                <c:forEach items="${Prets}" var="Pret">
                                    <tr id="row<c:out value="${Pret.id_Pret}"></c:out>">
                                        <td>P/<c:out value="${Pret.id_Pret}"></c:out></td>
                                        <td><c:out value="${Pret.titre_Ouvrage}"></c:out></td>
                                        <td><c:out value="${Pret.nom_Lecteur}"></c:out></td>
                                        <td><c:out value="${Pret.dateDebPret}"></c:out></td>
                                        <td><c:out value="${Pret.dateFinPret}"></c:out></td>
                                        <td><c:out value="${Pret.nbJourPret}"></c:out></td>
                                        <td>
                                            <c:choose>
                                                <c:when test="${Pret.etat}">
                                                    En cours
                                                </c:when>
                                                <c:when test="${!(Pret.etat)}">
                                                    Terminé
                                                </c:when>
                                                <c:otherwise> - </c:otherwise>
                                            </c:choose>
                                        </td>
                                        <td><c:out value="${Pret.amende}"></c:out></td>
                                        <td>
                                            <div class="tableListPret-button-group">
                                                <c:if test="${Pret.etat}">
                                                    <button type="button" class="tableListPret-btn-item" data-toggle="modal" onclick="initUpdatePret(<c:out value="${Pret.id_Pret}"/>)"><span><i class="fa fa-user-edit"></i></span>Modifier</button>
                                                </c:if>
                                                <button type="button" class="tableListPret-btn-item" onclick="deletePret(<c:out value="${Pret.id_Pret}"/>)"><span><i class="fa fa-times"></i></span>Supprimer</button>
                                            </div>
                                        </td>
                                    </tr>
                                </c:forEach>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!---->


        <!--MODAL ADD PRET-->
        <div id="modalAddPretPopUp" class="modalPopUp modalAddPretPopUp" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="modal-title-addPret">Effectuer un Pret</h4>
                        <span class="btn-close-addPret"><i class="fa fa-times-circle"></i></span>
                    </div>
                    <div class="modal-body">
                        <!-- div alert Amende -->
                        <div class="warning-Alert">
                            <i class="fa fa-warning"></i>
                            <span class="warning-msg">
                                Le nombre de jour de prêt est plus de 7jours, Le lecteur sera facturé de 5000 Fmg d'amende!
                            </span>
                        </div>

                        <!-- -->
                        <div class="col-12">
                            <form class="form-horizontal" id="addPretForm">
                                <div class="row">
                                    <div class="col-sm-12 form-container">
                                        <div class="form-group">
                                            <label class="control-label">Nom du Lecteur : </label>
                                            <input type="text" class="form-control text readerNameToAdd_InputField" id="readerNameToAdd_InputField" name="readerNametoAdd"
                                                   placeholder="Nom du Lecteur">
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label">Titre de l'Ouvrage : </label>
                                            <input type="text" class="form-control titleBookToAdd_InputField" id="titleBookToAdd_InputField" name="titleBooktoAdd"
                                                   placeholder="Titre de l'Ouvrage">
                                        </div>
                                        <div class="form-group">
                                            <div class="input_group">
                                                <label class="control-label">Début Pret: </label>
                                                <div class="">
                                                    <input type="text" class="form-control datedebutPretToAdd_InputField" id="datedebutPretToAdd_InputField" name="datedebutPrettoAdd" placeholder="Date début">
                                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                </div>
                                            </div>
                                            <div class="input_group">
                                                <label class="control-label">Fin Prêt: </label>
                                                <div class="">
                                                <input type="text" class="form-control datefinPretToAdd_InputField" id="datefinPretToAdd_InputField" name="datefinPrettoAdd" placeholder="Date fin">
                                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label" for="nbJourPretToAdd_InputField">Nombre de jour : </label>
                                            <input type="text" class="form-control nbJourPretToAdd_InputField" id="nbJourPretToAdd_InputField" name="nbJourPrettoAdd"
                                                   placeholder="" disabled>
                                        </div>

                                    </div>
                                </div>
                                <div class="button_group">
                                    <button type="button" class="btn-form btnConfirm" id="addPret">
                                        <i class="fa fa-save"></i>
                                        Confirmer
                                    </button>
                                    <button type="reset" class="btn-form btnCancel" id="cancelAdd">
                                        <i class="fa fa-times"></i>
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!---->



        <!--MODAL EDIT PRET-->
        <div id="modalEditPretPopUp" class="modalPopUp modalEditPretPopUp" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="modal-title-editPret"></h4>
                        <span class="btn-close-EditPret"><i class="fa fa-times-circle"></i></span>
                    </div>
                    <div class="modal-body">
                        <!-- div alert Amende -->
                        <div class="warning-Alert alert-editPret">
                            <i class="fa fa-warning"></i>
                            <span class="warning-msg">
                            </span>
                        </div>

                        <!-- -->
                        <div class="col-12">
                            <form class="form-horizontal" id="editPretForm">
                                <div class="row">
                                    <input type="hidden" name="IdPret">
                                    <input type="hidden" name="IdLecteur">
                                    <input type="hidden" name="IdOuvrage">
                                    <input type="hidden" name="CurrentNbJourPret">
                                    <input type="hidden" name="CurrentAmendePret">
                                    <div class="col-sm-12 form-container">
                                        <div class="form-group">
                                            <label class="control-label">Etat du Prêt : </label>
                                            <select name="etatPret" class="form-select">
                                                <option value="0">Terminé</option>
                                                <option value="1">En cours</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label" for="readerNameToEdit_InputField">Nom du Lecteur : </label>
                                            <input type="text" class="form-control readerNameToEdit_InputField" id="readerNameToEdit_InputField" name="readerName"
                                                   placeholder="Nom du Lecteur" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label" for="titleBookToEdit_InputField">Titre de l'Ouvrage : </label>
                                            <input type="text" class="form-control titleBookToEdit_InputField" id="titleBookToEdit_InputField" name="titleBook"
                                                   placeholder="Titre de l'Ouvrage">
                                        </div>
                                        <div class="form-group">
                                            <div class="input_group">
                                                <label class="control-label">Début Pret:</label>
                                                <div class="">
                                                    <input type="text" class="form-control datedebutPretToEdit_InputField" id="datedebutPretToEdit_InputField" name="datedebutPret" placeholder="Date début">
                                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                </div>
                                            </div>
                                            <div class="input_group">
                                                <label class="control-label">Fin Prêt:</label>
                                                <div class="">
                                                    <input type="text" class="form-control datefinPretToEdit_InputField" id="datefinPretToEdit_InputField" name="datefinPret" placeholder="Date fin">
                                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="form-group">
                                            <label class="control-label" for="nbJourPretToEdit_InputField">Nombre de jour : </label>
                                            <input type="text" class="form-control nbJourPretToEdit_InputField" id="nbJourPretToEdit_InputField" name="nbJourPret"
                                               placeholder="" disabled>
                                        </div>

                                    </div>
                                </div>
                                <div class="button_group">
                                    <button type="button" class="btn-form btnConfirm" id="editPret">
                                        <i class="fa fa-save"></i>
                                        Confirmer
                                    </button>
                                    <button type="reset" class="btn-form btnCancel" id="cancelEdit">
                                        <i class="fa fa-times"></i>
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!---->


    </div>
</section>

</body>

</html>