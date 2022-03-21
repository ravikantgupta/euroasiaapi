var express = require('express');
var router = express.Router();
var Coordinate = require("../models/coordinate");
var Device = require("../models/device");
var Vehicle = require("../models/vehicle");
const auth = require('../middleware/auth');
const constant = require('../common/constants');
const logger = require('../common/logger');

/**
 * @swagger 
 * /coordinates:
 *   get:
 *     summary: Get the all vehicles with device information of respective entity type .
 *     description: Get the all vehicles with device information of respective entity type.
 *     parameters:
 *          - in: header
 *            name: Route
 *            schema:
 *               type: integer 
 *            required: true 
 *     responses:
 *       200:
 *         description: A list of coordinates.
 *         content:
 *           application/json: 
 */

/*** Get the all alerts of respective entity type ***/
router.get('/', async(req, res)=> {    

    Vehicle.find({ entityId: req.user.entity_type})
        .then((vehicles) => {

            if(vehicles.length)
			{
				var flag=1;
				var result=[];	
				vehicles.forEach( async(e,index)=>{					
					const device=await  Device.findOne({ imei: e.deviceId}).sort({createdAt: -1}).limit(1).exec();					
					e.device = device;	
					result.push(e);						
					if(flag==vehicles.length)
					{
						return res.json({
                         status: constant.SUCCESS_STATUS,
                         message: constant.COORDINATE_LIST,                        
                         coordinates: result
                        })
					
					}
					flag++;
					
				});
				
			}else
			{
				return res.json({
                        status: constant.SUCCESS_STATUS,
                        message: constant.COORDINATE_LIST,                        
                        coordinates: vehicles
                    })
			}
			
            
        })
        .catch((err) => {
		    console.log(err);	
           logger.error(err); 
            return res.json({
                status: constant.FAIL_STATUS,
                message: constant.OSWW,
                error: err
            });
        })
});

module.exports = router;
