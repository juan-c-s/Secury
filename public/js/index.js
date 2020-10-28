const submitform = document.getElementById("submiter");
const direccion = document.getElementById('direccion');
const hora = document.getElementById('hora');
const tipo = document.getElementById('tipo');



function updateMap(dataDeLocation){

    mapboxgl.accessToken = 'pk.eyJ1IjoidGVubmlzdG9tbXljYWxsZTEiLCJhIjoiY2tidGswc25lMGFtNDJ2dWxva2xkcWMxcSJ9.9kUmvpjyRpGoLHWhLkNs1w';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
    }); 

    
}

fetch('/locationData').then((res)=>{

    res.json().then((data)=>{
         updateMap(data)
         console.log(data)
    })
        


})



submitform.addEventListener('submit',(e)=>{
    e.preventDefault()

    let lonYla = getValueLonandLati()

    let forInfo = {
        direccion : direccion.value,
        hora : hora.value,
        tipo : tipo.value,
        latitud : lonYla.longitud,
        longitud : lonYla.latitud
    }

    

    fetch('/informe',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(forInfo) 
    }) 

    direccion.value = "";
    hora.value = "";
    tipo.value = "";

})


function getValueLonandLati(){

    return {
        longitud : 5555,
        latitud : 6666
    }
}