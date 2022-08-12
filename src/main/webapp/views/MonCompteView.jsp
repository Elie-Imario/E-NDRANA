<%@include file="../components/Header.jsp"%>

<body>
<section class="top-nav">
    <%@include file="../components/TopMenu.jsp"%>
</section>

<section class="sideBar-nav">
    <%@include file="../components/SideBarMenu.jsp"%>
</section>
<div class="header"></div>
<section class="main-container">
    <h1 class="title-lead title-lead-monCompte">Modifier mot de passe</h1>

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

    <!--EDIT PASSWORD FORM-->

    <div class="block-container">
        <div class="block">
            <div class="block-item">
                <div class="title_block">
                    <img src="assets/img/lock.png" alt="access">
                </div>
                <div class="block_body">
                    <form action="#" method="POST" class="form-horizontal form-changepswrd">
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon"><i class="fa fa-key"></i></div>
                                <input type="password" class="form-control" id="currentPassword_InputField" name="currentPassword"
                                       placeholder="Ancien mot de passe">
                            </div>
                            <div class="input-group">
                                <div class="input-group-addon"><i class="fa fa-key"></i></div>
                                <input type="password" class="form-control" id="newPassword_InputField" name="newPassword"
                                       placeholder="Nouveau mot de passe">
                            </div>
                            <div class="input-group">
                                <div class="input-group-addon"><i class="fa fa-key"></i></div>
                                <input type="password" class="form-control" id="ConfirmPassword_InputField" name="confirmPassword"
                                       placeholder="Confirmer nouveau mot de passe">
                            </div>
                        </div>


                        <div class="button_group">
                            <button onclick="updatePassword()" type="button" class="btn-form btnConfirm" id="updatePassword">
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
        <!---->
    </div>
</section>


<script src="Js/MonCompteScript.js" type="text/javascript"></script>
</body>

</html>