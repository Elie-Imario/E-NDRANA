<%@include file="../components/Header.jsp"%>

<body>
    <section class="top-nav">
        <%@include file="../components/TopMenu.jsp"%>
    </section>

    <section class="sideBar-nav">
        <%@include file="../components/SideBarMenu.jsp"%>
    </section>

    <section class="main-container">
        <div class="container">
            <h1 class="title-lead">Ajout d'un nouveau Lecteur</h1>

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

            <div class="form col-6 container-fluid addLecteurFormContainer" >
                <form class="form-horizontal addLecteurForm">
                    <div class="form-input-group">
                        <div class="form-group">
                            <label class="control-label" for="readerName_InputField">Nom : </label>
                            <div class="input_group">
                                <input type="text" class="form-control" id="readerName_InputField" name="readerNameToAdd"
                                       placeholder="Nom du Lecteur">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="readerEmail_InputField">Email : </label>
                            <div class="input_group">
                                <input type="text" class="form-control" id="readerEmail_InputField" name="readerEmailToAdd"
                                       placeholder="Email du Lecteur">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="readerFonction_InputField">Fonction : </label>
                            <div class="input_group">
                                <input type="text" class="form-control" id="readerFonction_InputField" name="readerFonctionToAdd"
                                       placeholder="Fonction du Lecteur">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="readerMobile_InputField">Mobile : </label>
                            <div class="input_group">
                                <input type="text" class="form-control" id="readerMobile_InputField" name="readerMobileToAdd"
                                       placeholder="Mobile du Lecteur">
                            </div>
                        </div>
                    </div>
                    <div class="button_group">
                        <button type="button" class="btn-form btnConfirm" id="addLecteur">
                            <i class="fa fa-save"></i>
                            Enregistrer
                        </button>
                        <button type="reset" class="btn-form btnCancel" id="cancelAdd">
                            <i class="fa fa-times"></i>
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</body>

</html>