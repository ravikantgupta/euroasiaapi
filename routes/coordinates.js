var express = require('express');
var router = express.Router();
var Coordinate = require("../models/coordinate");

const auth = require('../middleware/auth');
const constant = require('../common/constants');
const logger = require('../common/logger');

router.get('/', async(req, res)=> {    

   //
});

module.exports = router;
