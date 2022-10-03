const express = require('express')
const https = require('https')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config() 

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

let city = 'waterloo,canada'

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    city = `${req.body.city},${req.body.country}`   

    const url = `${process.env.URL}q=${city}&appid=${process.env.KEY}&units=metric`
    https.get(url, (response) => {
        response.on('data', (d) => {
            const wdata = JSON.parse(d)
            const temp = wdata.main.temp
            const desc = wdata.weather[0].description
            const icon = wdata.weather[0].icon

            const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
            console.log(wdata)

            res.write(`<h1>Temp in ${req.body.city.toUpperCase()} is ${temp} C</h1>`)
            res.write(`<h3>The weather is currently - ${desc}</h3>`)
            res.write(`<img src=${imgUrl}>`)
            res.send()
        })
    })
})


app.listen(3000, () => {
    console.log('listening on port 3000')
});