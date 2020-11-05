const { Console } = require('console');
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

function organizeByTipo(){

    let data = getInfo()
    
    
    let objeto = {
        'lesionPersonal' : [],
        'hurto' : [],
        'hurtosArmados' : []
        
        
    }

    for(let entrada of data){

        let noencontro = true;
        for(let entradaPeque of objeto[entrada.tipo]){

            if(entrada.direccion == entradaPeque.direccion){
                entradaPeque.repeticiones++;
                noencontro = false;
            }

        }

        if(noencontro){
            objeto[entrada.tipo].push(  {
                direccion :  entrada.direccion,
                repeticiones : 1
            })
            
        }   

    }
    return objeto

    
    

   
    


}


module.exports = {
    getInfo : getInfo,
    setInfo : setInfo,
    organize : organizeByTipo
}