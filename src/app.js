const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bodyParser = require('body-parser'); 
const dataBase = require("./guardarDatos")
const { basename } = require("path");

const viewsPath = path.join(__dirname,"../templates/views");
const publicPath = path.join(__dirname, '../public')
const app = express();

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
const port = 3002;





app.get('',(req, res)=>{

    res.render("home")
})

app.get('/locationData',(req,res)=>{

    let data = dataBase.getInfo()

    res.send(data)
})

app.get('/mapa',(req,res)=>{

    res.render("mapa")

})

app.post('/informe',(req,res)=>{

    let newinfo = dataBase.setInfo(req.body)

    console.log(newinfo)

    res.sendStatus(200);

})

app.get('/graficas',(req,res)=>{
    res.render('graficas')

    

})


app.get('/dataBaseGrafi',(req,res)=>{

    let data = dataBase.organize();
    res.send(data)

})



app.listen(port,(err)=>{
    
    if(err){
        console.log(err)
    }else{
        console.log('Server running in port: ' + port);
    }
    
})