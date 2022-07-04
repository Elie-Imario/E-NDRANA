$(document).ready(function () {
    const ctx = document.getElementById('myChart').getContext("2d")
    let gradient = ctx.createLinearGradient(0,0,0,400)
    gradient.addColorStop(0, "rgba(58,123,213,1)")
    gradient.addColorStop(1, "rgba(0,210,255,0.3)")
    //let gradient = "linearGradient(red, rgba(0,210,255,0.3))"

    let delayed;


    const labels = [
        'Book1',
        'Book2',
        'Book3',
        'Book4',
        'Book5',
        'Book6',
        'Book7',
        'Book8',
        'Book9'
    ]

    const data = {
        labels,
        datasets:[{
            label: "Le nombre de prêts par livre",
            data: [3, 2, 4, 3, 5, 3, 2, 1, 4],
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
                        callback: function(value){
                            return value
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    }

    const myChart = new Chart(ctx, config)
})