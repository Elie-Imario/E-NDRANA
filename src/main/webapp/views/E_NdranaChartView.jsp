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
        <h1 class="title-lead">Histogramme recaputilatif des prets par Ouvrage</h1>
        <section class="chartView">
            <div class="chart">
                <canvas id="myChart">

                </canvas>
            </div>
        </section>
    </div>
</section>


</body>

</html>