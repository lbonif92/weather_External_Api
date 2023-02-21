const express = require ("express");
const app = express();
const port = 3000;
const https = require ("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
    
});

app.post("/", function(req, res){
    const key = "" // add your API key free account
    const langue = "fr"
    const unit = "metric"
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q= " + query + "&units=" + unit + "&lang=" + langue + "&appid=" + key;
    
    https.get (url, function(response){
        
        console.log(response.statusCode);
        response.on('data', function(data) {
            const weatherData = JSON.parse(data)
            const temperature = weatherData.main.temp
            const meteo = weatherData.weather[0].description
            const meteoIcon = weatherData.weather[0].icon
            const iconUrl = "http://openweathermap.org/img/wn/" + meteoIcon + "@2x.png"
            
            res.write("<h1>A " + query + " la meteo est " + meteo + ".</h1>")
            res.write( "<img src=" + iconUrl + "></img>")
            res.write("<p>Et la temperature de l'air est de " + temperature + " degres</p>");
            res.send()
        })
 
    }) 
})



app.listen(port, function () {
    console.log("Server is running on port" + port + " ." );
});