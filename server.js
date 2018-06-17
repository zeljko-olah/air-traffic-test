// Dependecies
const express = require('express')
const cors = require('cors')
const request = require('request')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback');


// initialize app
var app = express()

// cors
app.use(cors())
// body parser
app.use(bodyParser.json())
// serve static
app.use(serveStatic('dist', {'index': ['index.html', 'index.htm']}))
// histort api fallback
app.use(history())

// routes
// app.get('/', function(req, res) {
//   res.json({ message: 'API Initialized!'});
// });

app.get('/api/flights', (req, res) => {
  // get latitude and longitude
  const { lat, lng } = req.query

  // compose request url
  let url = `http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${lat}&lng=${lng}&fDstL=0&fDstU=100`

  console.log(url)

  // wrap request library in promise
  var getFlights = (url) => {
    return new Promise((resolve, reject) => {
      request({
        url,
        json: true
      }, (error, response, body) => {
        if (error) {
          reject(error)
        } else if (response.statusCode === 200) {
          resolve(body)
        }
      })
    })
  }

  // get fights
  getFlights(url).then((data) => {
    res.status(200)
    // then send data to client
    res.send({data})
  })
  // handle errors
  .catch((e) => {
    res.status(500)
    if (e.code === 'ENOTFOUND') {
      res.send('Unable to contact server!')
    } else {
      res.send(e.code)
    }
  })
})

// port
const port = process.env.PORT || 3000

// start server
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
