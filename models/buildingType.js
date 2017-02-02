var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BuildingSchema = new Schema({
    name: {
        Hindi: String,
        English: String,
        Gujarati: String
    },
    description: {
        Hindi: String,
        English: String,
        Gujarati: String
    },
    _id : String,
    orderIndex : String ,
    buildingImgUrl:[{imgUrl: String, _id : String}],
    buildingVideoUrl: [{videoUrl : String , _id : String}] 
});

module.exports  = mongoose.model('BuildingType', BuildingSchema);
 
