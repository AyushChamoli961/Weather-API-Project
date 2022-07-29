const express =  require("express");
const https  = require("https");
const parser = require("body-parser");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended : true }))


app.get("/" ,function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/" ,function(req,res){
    const query = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=210269d365c209f52f810e045fd8add3&units=metric";
    https.get(url  , function(response){
          response.on("data" , function(data){
          const weatherData =  JSON.parse(data)
          const temp = String(weatherData.main.temp)
          const description = weatherData.weather[0].description
          const icon = weatherData.weather[0].icon
          const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
          console.log(weatherData)
          res.write("<p>The weather is currently " + description + ".</p>")
          res.write("<h1>The weather in "+ query + " is " + temp + " degree celsius.</h1>");
          res.write("<img src = " + imgUrl + " >")
          res.send()
    })
})
})

app.listen(3000 ,  function(){
    console.log("Server is running at port 3000")
})