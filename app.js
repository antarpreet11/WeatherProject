const express = require('express')
const https = require('https')
const dotenv = require('dotenv')

dotenv.config() 

const app = express()
const city = 'waterloo,ca'

app.get('/', (req, res) => {

    const url = `${process.env.URL}q=${city}&appid=${process.env.KEY}&units=metric`
    https.get(url, (response) => {
        response.on('data', (d) => {
            const wdata = JSON.parse(d)
            const temp = wdata.main.temp
            const desc = wdata.weather[0].description
            console.log(temp)
            console.log(desc)
            res.send(`<h1>Temp in ${city} is ${temp} C</h1>`)
        })
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000')
});