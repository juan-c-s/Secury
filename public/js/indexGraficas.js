
getDataBase()
function hurtodArmados(info){

    info.number.push(0)
        
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            var chart = new Chart(ctx2, {
            type: 'bar',

            data: {
                labels: info.locations,
                datasets: [{
                    label: "Hurtos Armados por Zona",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: info.number,
                }]
            },


            options: {}
        });

}

function lecionesPersonales(info){
    info.number.push(0)

    var ctx1 = document.getElementById('myChart1').getContext('2d');
        var chart = new Chart(ctx1, {
            type: 'bar',

            data: {
                labels: info.locations,
                datasets: [{
                    label: "Leciones Personales por zona",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: info.number,
                }]
            },


            options: {}
        });
}

function hurto(info){

    info.number.push(0)

    var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'bar',

            data: {
                labels: info.locations,
                datasets: [{
                    label: "Hurtos por zona",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: info.number,
                }]
            },


            options: {}
        });
    
}

function getDataBase(){
    
   
    fetch('/dataBaseGrafi').then((res) => {

        res.json().then((data) => {

            console.log(data)

             hurto(organisa(data.hurto));
             lecionesPersonales(organisa(data.lesionPersonal));
             hurtodArmados(organisa(data.hurtosArmados));

        })

    })

  
}

function organisa(data){

    let obj = {
        locations : [],
        number : []
    }

    for(let entrada of data){

        obj.locations.push(entrada.direccion)
        obj.number.push(entrada.repeticiones)
        
    }

    return obj;
    
}

