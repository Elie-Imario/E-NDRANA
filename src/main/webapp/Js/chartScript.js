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



    /*$.ajax({
        type: "POST",
        data:{
            RequestType: "GetBookNbPret"
        },
        url: "list_Ouvrage",
        cache: false,
        dataType: "json",
        success: function (data) {
            $.each(data, (index, response)=>{
                nbPret.push(response)
            })


        }
    })

    console.log(nbPret)*/

})