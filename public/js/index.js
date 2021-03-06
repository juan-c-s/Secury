const submitform = document.getElementById("submiter");
const direccion = document.getElementById('direccion');
const hora = document.getElementById('hora');
const tipo = document.getElementById('tipo');
var mapInfo = [];
var direcciones = [];
var map = L.map('map', { scrollWheelZoom: false }).setView([6.201312, -75.565434], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

window.onload = ()=>{

    getDataBase()

}

function updateMap(dataDeLocation) {
    /* aqui va el camello
    */
    var redMarker = L.icon({
        iconURL: '/templates/views/redMarker.jpg',
        iconSize: [25, 41],
    });

    var marker = new L.marker([6.201312, -75.565434])
        .addTo(map);
}
submitform.addEventListener('submit', (e) => {
    e.preventDefault()

    let latYlon = getValueLonandLati(direccion.value);

    let latitude = 3.555;
    let longitude = 3.555;


    let forInfo = {
        direccion: direccion.value.trim(),
        hora: hora.value,
        tipo: tipo.value,
        latitud: latitude,
        longitud: longitude,
    }
    
    direcciones.push({
        latitude,
        longitude,
    });



    fetch('/informe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(forInfo)
    })

    direccion.value = "";
    hora.value = "";
    tipo.value = "";

})


function getValueLonandLati(direccion) {

    var elPoblado = L.latLng(6.201312, -75.565434);
    var direccionInfo = L.esri.Geocoding.geocode().text(direccion).nearby(elPoblado, 2000);
    var results = L.layerGroup().addTo(map);

    var info = L.esri.Geocoding.geocode().text(direccion).nearby(elPoblado, 2000).run((err, response) => {
        if (err) {
            console.log(err);
            return;
        }

        var marker = new L.marker([response.results[0].latlng.lat, response.results[0].latlng.lng]).bindPopup(response.results[0].text)
            .addTo(map);


        return response.results[0];

    })
    return info;

}

function getDataBase(){



    fetch('/locationData').then((res) => {

        res.json().then((data) => {

            for(let location of data){
                 getValueLonandLati(location.direccion)
               

                
            }

            let radomn = Math.round(Math.random() * ((data.length-1) - 0) + 0)

   
          
            alert("Atención - " + data[radomn].tipo + " en " + data[radomn].direccion);
        })

    })


}

