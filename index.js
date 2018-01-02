const express = require('express')
const app = express()

// var config = require('./config/environment');

// Express middleware
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '1mb'}));
app.use(methodOverride());
app.use(helmet());
app.use(cookieParser());
app.use(morgan('dev', {
  skip: function (req, res) {
    // remove the frontend dev server's 'json' calls from the console output
    return req.originalUrl.indexOf('json') > 0
  }
}));

// API ROUTING
require('./api')(app);

app.listen(8080, function () {
  console.log('App running on port 8080')
})
