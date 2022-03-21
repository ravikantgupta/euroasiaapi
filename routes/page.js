var express = require('express');
var router = express.Router();
var Pages = require("../models/Pages");
const constant = require('../common/constants');
const logger = require('../common/logger');

/************* Get page ***************/
router.get('/:url', function(req, res) {

    Pages.findOne({		   
              url: req.params.url
            })
        .then((data) => {			
            return res.json({
                        status: true,
                        message: 'page detail',                        
                        page: data
                    })
        })
        .catch((err) => {
           logger.error(err); 
            return res.json({
                status: false,
                message: 'somthing wrong',
                error: err
            });
        })
});


module.exports = router;