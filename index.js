// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
  let dateParameter = req.params.date;

  let date;
  if (dateParameter) {
    // If not a number alias ex: 20-20-2020
    if (isNaN(dateParameter)) {
      date = new Date(dateParameter)
    } else {
      date = new Date(parseInt(dateParameter))
    }
  }
  else {
    date = new Date();
  }

  let message = {};
  if (date) {
    console.log(date)
    let unix = date.getTime()
    console.log(unix)
    let formattedDate = date.toUTCString()
    console.log(formattedDate)
    if (formattedDate == "Invalid Date") {
      message = { error: "Invalid Date" }
    }
    else if (unix == null) {
      message = { error: "Invalid Date" }
    }
    else {
      message = {
        unix: unix,
        utc: formattedDate
      }
    }

  }
  else {
    message = { error: "Invalid Date" }
  }
  res.json(message)
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
