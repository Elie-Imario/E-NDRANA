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
        <section class="stat-container">
            <div class="info-conatiner">
                <div class="cards-box">
                    <div class="card">
                        <div class="card-header">
                            <span><i class="fa fa-check"></i></span>
                        </div>
                        <div class="card-body">
                            <span class="card-title-lead">Nombre de prêt effectué </span>
                            <span class="card-description"><c:out value="${_nbPretEffectue}"></c:out></span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <span><i class="fa fa-book"></i></span>
                        </div>
                        <div class="card-body">
                            <span class="card-title-lead">Nombre de livre emprinté</span>
                            <span class="card-description"><c:out value="${_nbBookEmprunte}"></c:out></span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <span><i class="fa fa-users"></i></span>
                        </div>
                        <div class="card-body">
                            <span class="card-title-lead">Total des lecteurs</span>
                            <span class="card-description"><c:out value="${_nbLecteur}"></c:out></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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