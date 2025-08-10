const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    name:{type:String,required:true},
    state:{type:String,required:true},
    image:{type:String}
    });
    
module.exports = mongoose.model('Area', areaSchema);