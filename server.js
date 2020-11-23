const express        = require('express');
const bodyParser  = require('body-parser');
const dotenv          = require('dotenv').config();
const helmet          = require('helmet');
const favicon = require("express-favicon");
const apiRoutes     = require('./routes/api.js');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// security
app.use(helmet());

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });
// CV page
app.route('/cv')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/cv.html');
  });
// Contact page
app.route('/contact')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/contact.html');
  });
//Routing for API 
apiRoutes(app);
    
//404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port " + process.env.PORT);
  });