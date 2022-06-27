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
        <h1 class="title-lead">Ajout d'un nouveau Ouvrage</h1>

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

        <div class="form col-6 container-fluid addBookFormContainer" >
            <form class="form-horizontal addBookForm">
                <div class="form-input-group">
                    <div class="form-group">
                        <label class="control-label" for="titleBook_InputField">Titre de l'Ouvrage : </label>
                        <div class="input_group">
                            <input type="text" class="form-control" id="titleBook_InputField" name="titleBookToAdd"
                                   placeholder="Titre de l'Ouvrage...">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="AuthorName_InputField">Nom de l'Auteur : </label>
                        <div class="input_group">
                            <input type="text" class="form-control" id="AuthorName_InputField" name="AuthorNameToAdd"
                                   placeholder="Nom de l'Auteur...">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="dateEdition_InputField">Date d'édition : </label>
                        <div class="input_group">
                            <input type="text" class="form-control dateEdition_InputField" id="dateEdition_InputField" name="dateEditionToAdd" placeholder="jj/mm/aaaa">
                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                        </div>
                    </div>
                </div>
                <div class="button_group">
                    <button type="button" class="btn-form btnConfirm" id="addBook">
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