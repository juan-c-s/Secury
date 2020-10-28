const submitform = document.getElementById("submiter");
const direccion = document.getElementById('direccion');
const hora = document.getElementById('hora');
const tipo = document.getElementById('tipo');

var direcciones = [];
var map = L.map('map', { scrollWheelZoom: false }).setView([6.201312, -75.565434], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function updateMap(dataDeLocation) {
    /* aqui va el camello
    */
    for (var i = 0; i < direcciones.length; i++) {
        var marker = new L.marker([direcciones[i][0], locations[i][1]])
            .addTo(map);
    }
    console.log(dataDeLocation);
}

fetch('/locationData').then((res) => {

    res.json().then((data) => {
        updateMap(data)
        console.log(data)
    })



})

let info;

submitform.addEventListener('submit', (e) => {
    e.preventDefault()

    let lonYla = getValueLonandLati(direccion.value);
    console.log(lonYla);
    let latitude = lonYla.lat;
    let longitude = lonYla.lng;

    let forInfo = {
        direccion: direccion.value,
        hora: hora.value,
        tipo: tipo.value,
        latitud: latitude,
        longitud: longitude,
    }
    console.log(forInfo.latitud);
    console.log(forInfo.longitud);
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
        console.log(response)
        return new Promise((resolve) => {
            resolve(response);
        }).then((response) => {
            return response;
        })

    })


}

