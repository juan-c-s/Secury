
getDataBase()
function makeGrafs(info){

        console.log(info)

        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'bar',

            data: {
                labels: Object.keys(info.hurto),
                datasets: [{
                    label: "Hurtos por zona",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: Object.values(info.hurto),
                }]
            },


            options: {}
        });
        var ctx1 = document.getElementById('myChart1').getContext('2d');
        var chart = new Chart(ctx1, {
            type: 'bar',

            data: {
                labels: Object.keys(info.lesionPersonal),
                datasets: [{
                    label: "Leciones Personales por zona",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: Object.values(info.lesionPersonal),
                }]
            },


            options: {}
        });
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            var chart = new Chart(ctx2, {
            type: 'bar',

            data: {
                labels: Object.keys(info.hurtosArmados),
                datasets: [{
                    label: "Hurtos Armados por Zona",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: Object.values(info.hurtosArmados),
                }]
            },


            options: {}
        });

}

function getDataBase(){
   
    fetch('/dataBaseGrafi').then((res)=>{

        res.json().then((info)=>{
            makeGrafs(info)
        })
    

        
            
    })

  
}

