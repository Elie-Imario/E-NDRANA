$(document).ready(function () {
    const ctx = $('#myChart').get(0).getContext("2d")
    let gradient = ctx.createLinearGradient(0,0,0,400)
    gradient.addColorStop(0, "rgba(58,123,213,1)")
    gradient.addColorStop(1, "rgba(0,210,255,0.3)")

    let delayed;


    const labels = []
    const nbPret = []

    $.ajax({
        type: "POST",
        data:{
            RequestType: "GetDetailsBookPrete"
        },
        url: "list_Ouvrage",
        cache: false,
        dataType: "json",
        success: function (datas) {
            $.each(datas, (index, response)=>{
                const data = {
                    labels: response.titleBook,
                    datasets:[{
                        label: "Le nombre de prêts par livre",
                        data: response.nbFoisPret,
                        fill: true,
                        backgroundColor: gradient,
                        borderColor: "#fff",
                        pointBackgroundColor: "rgb(189,195,199)"
                    }]
                }

                const config = {
                    type: 'line',
                    data: data,
                    options:{
                        radius: 5,
                        hitRadius: 30,
                        hoverRadius: 12,
                        responsive: true,
                        animation: {
                            onComplete: ()=>{
                                delayed= true;
                            },
                            delay: (context)=>{
                                let delay = 0
                                if(context.type === "data" && context.mode === "default" &&!delayed){
                                    delay = context.dataIndex * 300 + context.datasetIndex * 100
                                }
                                return delay
                            },
                            tension: {
                                duration: 1000,
                                easing: 'linear',
                                from: 0.4,
                                to: 0,
                                loop: true
                            }
                        },
                        scales:{
                            y:{
                                ticks: {
                                    precision: 0,
                                },
                                beginAtZero: true
                            }
                        }
                    }
                }
                const myChart = new Chart(ctx, config)
            })
        }
    })


    $("#exportLineChartTopdf").on('click',function(){
        console.log("Hello world")
        /*var logo_url = "assets/img/eBookIco.png";
        getImgFromUrl(logo_url, function (img) {
            generatePDF(img);
        });*/
        generatePDF()
    })


})


function getImgFromUrl(logo_url, callback) {
    var img = new Image();
    img.src = logo_url;
    img.onload = function () {
        callback(img);
    };
}

function generatePDF(){
    var newCanvas = $('#myChart')
    var newCanvasImg = newCanvas[0].toDataURL("image/png", 1.0);
    var specialElementHandlers = {
        '#editor': function (element,renderer) {
            return true;
        }
    };
    var doc = new jsPDF();

    //doc.addImage(img, 'JPEG', 5, 4, 20, 23);
    doc.setFontSize(12);
    doc.setTextColor("#4C5766");
    doc.text(50, 15, "Histogramme récapitulatif Prets par livres");
    doc.addImage(newCanvasImg, 'JPEG', 15, 35, 180, 95);
    doc.save('Récapitulatif_des_prets.pdf');
}