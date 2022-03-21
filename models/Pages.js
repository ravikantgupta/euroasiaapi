const mongoose = require('mongoose');
const PageSchema = mongoose.Schema({
    title : String,
    url : String,
	image : String,
    short_description : String,
    description : String,    
    is_deleted : String,
    is_active  : String,
    created_at   : String,
    updated_at  : String,  
}, {
    timestamps: true
});

module.exports = mongoose.model('Pages', PageSchema);