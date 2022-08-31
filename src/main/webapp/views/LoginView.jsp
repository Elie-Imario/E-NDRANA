<%--
  Created by IntelliJ IDEA.
  User: Young Bakugo
  Date: 15/08/2022
  Time: 15:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>E-Ndrana</title>
    <link rel="shortcut icon" href="assets/img/eBook_Ico.png" type="image/x-icon">

    <link rel="stylesheet" href="assets/fontawesome-free-6.1.1-web/css/all.min.css">
    <link rel="stylesheet" href="assets/fontawesome-free-6.1.1-web/css/fontawesome.min.css">
    <link rel="stylesheet" href="css/loginStyle.css">

</head>
<body>
    <div class="container">
        <header id="header">
            <span>E-NDRANA</span>
        </header>

        <div class="form col-6 container-fluid LoginFormContainer" >
            <form class="form-horizontal LoginForm">
                <div class="form-input-group">
                    <div class="form-group">
                        <div class="input_group">
                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                            <input type="text" class="form-control" id="login_InputField" name="login" placeholder="Utilisateur">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input_group">
                            <span class="input-group-addon"><i class="fa fa-key"></i></span>
                            <input type="password" class="form-control" id="password_InputField" name="password" placeholder="Mot de passe">
                        </div>
                    </div>
                </div>
                <div class="button_group">
                    <button type="button" class="btn-form btnConfirm" id="Sign-In">
                        <i class="fa fa-sign-in"></i>
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
        <div class="alert-wrapper">
            <i class="fa fa-exclamation-circle"></i>
            <span class="error-msg"></span>
        </div>
    </div>

    <script src="Js/jquery-2.2.4.js"></script>
    <script src="Js/LoginScript.js"></script>
</body>
</html>
