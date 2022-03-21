const dotenv = require('dotenv').config();

module.exports = {
  'secret':process.env.DATABASE_SECRET,
  'database': process.env.DATABASE_URL
};
