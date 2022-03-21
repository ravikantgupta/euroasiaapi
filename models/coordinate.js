var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoordinateSchema = new Schema({
    lat: {
        type: String,
        required: true,
        default: ''
    },
    lng: {
        type: String,       
        required: true,
		default: ''
    },    
    createdAt: { 
       type: Date, 
       required: true, 
       default: Date.now 
   },
   updatedAt: { 
      type: Date, 
      required: true, 
      default: Date.now
   }
});

module.exports = mongoose.model('Coordinate', CoordinateSchema);
