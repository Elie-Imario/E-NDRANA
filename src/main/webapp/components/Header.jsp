<%--
  Created by IntelliJ IDEA.
  User: Young Bakugo
  Date: 28/06/2022
  Time: 16:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>E-Ndrana</title>
    <link rel="shortcut icon" href="assets/img/eBook_Ico.png" type="image/x-icon">

    <!-- Common Styles -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/DataTables/datatables.min.css">
    <link rel="stylesheet" href="assets/DataTables/dataTables.dateTime.min.css">
    <link rel="stylesheet" href="assets/datePicker/bootstrap-datepicker.css">
    <link rel="stylesheet" href="assets/datePicker/datePickerStyleSheet.css">
    <link rel="stylesheet" href="assets/fontawesome-free-6.1.1-web/css/all.min.css">
    <link rel="stylesheet" href="assets/fontawesome-free-6.1.1-web/css/fontawesome.min.css">
    <!-- -->

    <!-- Views Styles -->
    <link rel="stylesheet" href="css/AddnewBookStyleSheet.css">
    <link rel="stylesheet" href="css/AddnewLecteurStyleSheet.css">
    <link rel="stylesheet" href="css/changePasswordStyleSheet.css">
    <link rel="stylesheet" href="css/mainStyle.css">
    <link rel="stylesheet" href="css/modalLecteur.css">
    <link rel="stylesheet" href="css/modalOuvrage.css">
    <link rel="stylesheet" href="css/modalPret.css">
    <link rel="stylesheet" href="css/Sidebarstyle.css">
    <link rel="stylesheet" href="css/topMenu.css">

    <!-- -->

    <!--common scripts -->
    <script src="Js/jquery-2.2.4.js"></script>
    <script src="Js/bootstrap.min.js"></script>
    <script src="Js/jquery.autocomplete.min.js"></script>
    <script src="assets/DataTables/datatables.js"></script>
    <script src="assets/DataTables/datatables.min.js"></script>
    <script src="assets/DataTables/moment.min.js"></script>
    <script src="assets/DataTables/dataTables.dateTime.min.js"></script>
    <script src="assets/DataTables/dataTables.buttons.min.js"></script>
    <script src="assets/DataTables/jszip.min.js"></script>
    <script src="assets/DataTables/pdfmake.min.js"></script>
    <script src="assets/DataTables/vfs_fonts.js"></script>
    <script src="assets/DataTables/buttons.html5.min.js"></script>
    <script src="assets/DataTables/buttons.print.min.js"></script>
    <script src="assets/datePicker/dateformat.min.js"></script>
    <script src="assets/datePicker/bootstrap-datepicker.js"></script>
    <script src="assets/chart%20js/chart.min.js"></script>
    <script src="assets/chart%20js/jspdf.min.js"></script>

    <script >
            let statusConnection = sessionStorage.getItem("userConnected")
            if(!statusConnection){
                $(location).attr('href', "login")
            }
     </script>

    <!-- -->

    <!-- Components scripts -->
    <script src="Js/LecteurScript.js"></script>
    <script src="Js/OuvrageScript.js"></script>
    <script src="Js/PretScript.js"></script>
    <script src="Js/Scripts.js"></script>
    <script src="Js/Accordionscript.js"></script>
    <!-- -->

</head>
