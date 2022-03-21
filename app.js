var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var config = require('./config/database');
const constant = require('./common/constants');
var expressLogging = require('express-logging'),
    logger = require('logops');
	
mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });


var coordinate = require('./routes/coordinates');
var page = require('./routes/page');

const auth = require('./middleware/auth');
const dotenv = require('dotenv').config();


var app = express();

app.use(expressLogging(logger));
var path = require('path');
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.send(constant.PUC);
});


app.use('/api/coordinates',auth, coordinate);
app.use('/page', page);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.use(function(req, res, next) {
  var err = new Error(constant.NOT_FOUND);
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) { 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; 
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
