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
        <h1 class="title-lead">Liste des ouvrages</h1>

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
                        <form class="form-horizontal searchBookForm" id="searchBookForm">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label">Titre de l'Ouvrage : </label>
                                        <input type="search" class="form-control" name="titreOuvrageSearch"
                                           placeholder="Titre de l'Ouvrage...">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label">Nom de l'Auteur : </label>
                                        <input type="search" class="form-control" name="nomAuteurSearch"
                                           placeholder="Nom de l'Auteur...">
                                    </div>
                                </div>
                            </div>
                            <div class="button_group">
                                <button class="btn-form" id="searchBook" type="button"
                                        title="Rechercher">
                                    <i class="fa fa-search"></i>
                                    Rechercher
                                </button>
                                <button type="reset" class="btn-form" id="reinitialiserOuvrageSearch"
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

        <!-- TABLE LIST OUVRAGE -->
        <div class="tableContainer">
            <div class="button_group">
                <button class="btn-form" id="exportListBookTopdf" type="button"
                        title="Exporter">
                    <i class="fa fa-file-pdf"></i>
                    Exporter
                </button>
            </div>
            <div class="panel-body">
                <div class="table-responsive">
                    <div id="divTabListOuvrage" class="table-listOuvrage">

                        <table class="table table-striped table-bordered table-responsive table-condensed tablelistOuvrage">
                            <thead>
                            <tr class="">
                                <th scope="col" style="width:40px">N°Ouvrage</th>
                                <th scope="col" style="width:30%">Titre</th>
                                <th scope="col" style="width:30%">Auteur</th>
                                <th scope="col" style="width:15%">Date édition</th>
                                <th scope="col" style="width:10%">Disponible</th>
                                <th scope="col" style="width:20%">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach items="${Books}" var="Book">
                                <tr id="row<c:out value="${Book.id_Ouvrage}"></c:out>">
                                    <td>L/<c:out value="${Book.id_Ouvrage}"></c:out></td>
                                    <td><c:out value="${Book.titre_Ouvrage}"></c:out></td>
                                    <td><c:out value="${Book.nom_Auteur}"></c:out></td>
                                    <td><c:out value="${Book.date_Edition}"></c:out></td>
                                    <td>
                                        <c:choose>
                                            <c:when test="${Book.disponible}">
                                                Oui
                                            </c:when>
                                            <c:when test="${!(Book.disponible)}">
                                                Non
                                            </c:when>
                                            <c:otherwise> - </c:otherwise>
                                        </c:choose>
                                    </td>
                                    <td>
                                        <div class="tableListOuvrage-button-group">
                                            <button type="button" class="tableListOuvrage-btn-item" data-toggle="modal" onclick="getDetailLivre(<c:out value="${Book.id_Ouvrage}"/>)" ><span><i class="fa fa-search"></i></span> Voir details</button>
                                            <button type="button" class="tableListOuvrage-btn-item" data-toggle="modal" onclick="initUpdateLivre(<c:out value="${Book.id_Ouvrage}"/>)"><span><i class="fa fa-user-edit"></i></span>Modifier</button>
                                            <button type="button" class="tableListOuvrage-btn-item" onclick="deleteLivre(<c:out value="${Book.id_Ouvrage}"/>)"><span><i class="fa fa-times"></i></span>Supprimer</button>
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

        <!--MODAL DETAILS OUVRAGE-->
        <div id="modalDeatilOuvragePopUp" class="modalPopUp modalDetailOuvragePopUp" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="modal-title-detailOuvrage"></h4>
                        <span class="btn-close-BookDetailmodal"><i class="fa fa-times-circle"></i></span>
                    </div>
                    <div class="modal-body">
                        <div class="col-12">
                            <div class="col-12 modal-detail">
                                <span class="label-detail">Titre de l'Ouvrage :</span>
                                <span class="detail" id="detail-titlebook"></span>
                            </div>
                            <div class="col-12 modal-detail">
                                <span class="label-detail">Nom de l'auteur :</span>
                                <span class="detail" id="detail-authorName"></span>
                            </div>
                            <div class="col-12 modal-detail">
                                <span class="label-detail">Date d'édition :</span>
                                <span class="detail" id="detail-dateEdition"></span>
                            </div>
                            <div class="col-12 modal-detail">
                                <span class="label-detail">Disponible :</span>
                                <span class="detail" id="detail-disponible"></span>
                            </div>
                            <div class="col-12 modal-detail">
                                <span class="label-detail">Nombre de fois d'emprunt :</span>
                                <span class="detail" id="detail-nbFoisPret"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!---->



        <!--MODAL EDIT OUVRAGE-->
        <div id="modalEditOuvargePopUp" class="modalPopUp modalEditOuvragePopUp" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="modal-title-editOuvrage"></h4>
                        <span class="btn-close-BookEditmodal"><i class="fa fa-times-circle"></i></span>
                    </div>
                    <div class="modal-body">
                        <div class="col-12">
                            <form class="form-horizontal" id="">
                                <div class="row">
                                    <input type="hidden" name="IdOuvrage">
                                    <input type="hidden" name="status">
                                    <div class="col-sm-12 form-container">
                                        <div class="form-group">
                                            <label class="control-label" for="titleBook_InputField">Titre de l'ouvrage : </label>
                                            <input type="text" class="form-control" id="titleBook_InputField" name="titleBook"
                                                   placeholder="Titre de l'ouvrage...">
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label" for="authorName_InputField">Nom de l'Auteur : </label>
                                            <input type="text" class="form-control" id="authorName_InputField" name="authorBook"
                                                   placeholder="Nom de l'Auteur...">
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label" for="dateEditionToEdit_InputField">Date d'édition : </label>
                                            <div class="input_group">
                                                <input type="text" class="form-control dateEditionToEdit_InputField" id="dateEditionToEdit_InputField" name="dateEditionBook" placeholder="jj/mm/aaaa">
                                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="button_group">
                                    <button type="button" class="btn-form btnConfirm" id="editBook">
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