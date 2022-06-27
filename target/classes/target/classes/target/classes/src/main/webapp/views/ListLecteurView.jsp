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
            <h1 class="title-lead">Liste des Lecteurs</h1>

            <!-- Alert Section -->
            <div class="alert-container">
                <div class="alert-success">
                    <div class="ico-alert"><span><i class="fa fa-bell"></i></span></div>
                    <div class="alert-success-content">
                        <span class="close-btn"><i class="fa fa-times-circle"></i></span>
                        <span class="alertmsg">
                        </span>
                    </div>
                </div>
            </div>
            <!---->

            <!-- Filtre avancée -->
            <div class="filtreAvance-bloc" id="accordion2" role="tablist" aria-multiselectable="true">
                <div class="filtreAvance-content">
                    <div class="heading-content" role="tab" id="headingOne">
                        <h4 class="content-title">
                            <a role="button" data-toggle="collapse" data-parent="#accordion2" href="#recherche2"
                               aria-expanded="true" aria-controls="collapseOne" title="Afficher/Masquer les filtres"
                               class="accordion-title collapsed">
                                <i class="fa fa-angle-right"></i><span>Filtre avancé</span>
                            </a>
                        </h4>
                    </div>
                    <div id="recherche2" class="collapse" role="tabpanel" aria-labelledby="headingOne">
                        <div class="content-body">
                            <form class="form-horizontal searchLecteurForm" id="searchLecteurForm">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label class="control-label">Nom : </label>
                                            <input type="text" class="form-control" id="InputFieldSearchForNomLecteur" name="nomLecteurSearch"
                                               placeholder="Nom du Lecteur">
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">Fonction : </label>
                                            <input type="text" class="form-control" id="InputFieldSearchForFonctionLecteur" name="fonctionLeacteurSearch"
                                               placeholder="Fonction du Lecteur">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label class="control-label">Mobile : </label>
                                            <input type="text" class="form-control" id="InputFieldSearchForMobileLecteur" name="mobileLeacteurSearch"
                                               placeholder="Mobile du Lecteur">
                                        </div>
                                    </div>
                                </div>
                                <div class="button_group">
                                    <button class="btn-form" id="searchLecteur" type="button"
                                            title="Rechercher">
                                        <i class="fa fa-search"></i>
                                        Rechercher
                                    </button>
                                    <button type="reset" class="btn-form" id="reinitialiserLecteurSearch"
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

            <!-- TABLE LIST LECTEUR -->
            <div class="tableContainer">
                <div class="button_group">
                    <button class="btn-form" id="exportListLecteurTopdf" type="button"
                            title="Exporter">
                        <i class="fa fa-file-pdf"></i>
                        Exporter
                    </button>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <div id="divTabListLecteur" class="table-listLecteur">

                            <table class="table table-striped table-bordered table-responsive table-condensed tablelistLecteur">
                                <thead>
                                <tr class="">
                                    <th scope="col" style="width:40px">N°Lecteur</th>
                                    <th scope="col" style="width:35%">Nom du Lecteur</th>
                                    <th scope="col" style="width:20%">Fonction</th>
                                    <th scope="col" style="width:20%">Mobile</th>
                                    <th scope="col" style="width:15%">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <c:forEach items="${Lecteurs}" var="Lecteur">
                                    <tr id="row<c:out value="${Lecteur.id}"></c:out>">
                                        <td>LEC/<c:out value="${Lecteur.id}"></c:out></td>
                                        <td><c:out value="${Lecteur.nom_Lecteur}"></c:out></td>
                                        <td><c:out value="${Lecteur.fonction}"></c:out></td>
                                        <td><c:out value="${Lecteur.mobile}"></c:out></td>
                                        <td>
                                            <div class="tableListLecteur-button-group">
                                                <button type="button" class="tableListLecteur-btn-item" onclick="getDetailLecteur(<c:out value="${Lecteur.id}"/>)" ><span><i class="fa fa-search"></i></span> Voir details</button>
                                                <button type="button" class="tableListLecteur-btn-item" onclick="initUpdateLecteur(<c:out value="${Lecteur.id}"/>)"><span><i class="fa fa-user-edit"></i></span>Modifier</button>
                                                <button type="button" class="tableListLecteur-btn-item" onclick="deleteLecteur(<c:out value="${Lecteur.id}"/>)"><span><i class="fa fa-times"></i></span>Supprimer</button>
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

            <!--MODAL DETAILS LECTEUR-->
            <div id="modalDeatilLecteurPopUp" class="modalPopUp modalDeatilLecteurPopUp" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="modal-title-detailLecteur"></h4>
                            <span class="btn-close-LecteurDetailModal"><i class="fa fa-times-circle"></i></span>
                        </div>
                        <div class="modal-body">
                            <div class="col-12">
                                <div class="col-12 modal-detail">
                                    <span class="label-detail">Nom du lecteur :</span>
                                    <span class="detail" id="detail-nomLecteur"></span>
                                </div>
                                <div class="col-12 modal-detail">
                                    <span class="label-detail">Fonction :</span>
                                    <span class="detail" id="detail-fonctionLecteur"></span>
                                </div>
                                <div class="col-12 modal-detail">
                                    <span class="label-detail">Email :</span>
                                    <span class="detail" id="detail-emailLecteur"></span>
                                </div>
                                <div class="col-12 modal-detail">
                                    <span class="label-detail">Mobile :</span>
                                    <span class="detail" id="detail-mobileLecteur"></span>
                                </div>
                                <div class="col-12 modal-detail">
                                    <span class="label-detail">Livre emprintée :</span>
                                    <span class="detail" id="detail-nbLivre"></span>
                                </div>
                                <div class="col-12 modal-detail">
                                    <span class="label-detail">Amende :</span>
                                    <span class="detail" id="detail-amendeLecteur"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!---->



            <!--MODAL EDIT LECTEUR-->
            <div id="modalEditLecteurPopUp" class="modalPopUp modalEditLecteurPopUp" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="modal-title-editLecteur"></h4>
                            <span class="btn-close-LecteurEditmodal"><i class="fa fa-times-circle"></i></span>
                        </div>
                        <div class="modal-body">
                            <div class="col-12">
                                <form class="form-horizontal" id="editLecteurForm">
                                    <div class="row">
                                        <input type="hidden" name="IdLecteur">
                                        <div class="col-sm-12 form-container">
                                            <div class="form-group">
                                                <label class="control-label" for="readerName_InputField">Nom : </label>
                                                <div class="input_group">
                                                    <input type="text" class="form-control" id="readerName_InputField" name="readerName"
                                                           placeholder="Nom du Lecteur">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label" for="readerEmail_InputField">Email : </label>
                                                <div class="input_group">
                                                    <input type="text" class="form-control" id="readerEmail_InputField" name="readerEmail"
                                                           placeholder="Fonction du Lecteur">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label" for="readerFonction_InputField">Fonction : </label>
                                                <div class="input_group">
                                                    <input type="text" class="form-control" id="readerFonction_InputField" name="readerFonction"
                                                           placeholder="Fonction du Lecteur">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label" for="readerMobile_InputField">Mobile : </label>
                                                <div class="input_group">
                                                    <input type="text" class="form-control" id="readerMobile_InputField" name="readerMobile"
                                                           placeholder="Mobile du Lecteur">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="button_group">
                                        <button type="button" class="btn-form btnConfirm" id="editLecteur">
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