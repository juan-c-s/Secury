const fs = require('fs');

function getInfo(){

    let data = fs.readFileSync('datos.json')
    data = JSON.parse(data)

    return data

}

function setInfo(newData){

    let data = getInfo();

    data.push(newData)

    fs.writeFile('datos.json',JSON.stringify(data),()=>{
        console.log("saved")
    })

}


module.exports = {
    getInfo : getInfo,
    setInfo : setInfo
}