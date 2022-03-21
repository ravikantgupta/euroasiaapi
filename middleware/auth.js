const request = require('request');
const dotenv = require('dotenv').config();
const logger = require('../common/logger');
const constant = require('../common/constants');

module.exports = (req, res, next) => {
   if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};