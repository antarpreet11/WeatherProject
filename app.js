const express = require('express')
const https = require('https')
const dotenv = require('dotenv')

const app = express()

app.get('/', (req, res) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=waterloo,ca&appid=${apikeygoeshere}&units=metric`
    https.get(url, (response) => {
        console.log(response)
    })

    res.send('Hello')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
});