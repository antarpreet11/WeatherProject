const express = require('express')
const https = require('https')
const dotenv = require('dotenv')

dotenv.config() 

const app = express()

let city = 'waterloo,ca'

app.get('/', (req, res) => {

    const url = `${process.env.URL}q=${city}&appid=${process.env.KEY}&units=metric`
    https.get(url, (response) => {
        response.on('data', (d) => {
            const wdata = JSON.parse(d)
            const temp = wdata.main.temp
            const desc = wdata.weather[0].description
            const icon = wdata.weather[0].icon

            const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
            console.log(wdata)

            res.write(`<h1>Temp in ${city} is ${temp} C</h1>`)
            res.write(`<h3>The weather is currently - ${desc}</h3>`)
            res.write(`<img src=${imgUrl}>`)
            res.send()
        })
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000')
});