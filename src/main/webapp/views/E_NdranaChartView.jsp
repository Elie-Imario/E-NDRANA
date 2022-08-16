<%@include file="../components/Header.jsp"%>

<body>
<section class="top-nav">
    <%@include file="../components/TopMenu.jsp"%>
</section>

<section class="sideBar-nav">
    <%@include file="../components/Sidebar.jsp"%>
</section>

<section class="main-container">
    <div class="container">
        <h1 class="title-lead">Histogramme recaputilatif des prets par Ouvrage</h1>
        <section class="chartView">
            <div class="chart">
                <canvas id="myChart">

                </canvas>
            </div>
            <div class="button_group">
                <button class="btn-form" id="exportLineChartTopdf" type="button"
                        title="Exporter">
                    <i class="fa fa-file-pdf"></i>
                    Exporter
                </button>
            </div>
        </section>
    </div>
</section>

<script src="Js/chartScript.js"></script>

</body>

</html>