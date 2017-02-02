var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    _id : String,
    ifNeedAssistance : String,
    forPAge : String,
    questionType: String,
    question: {
        text: {
            Hindi: String,
            English: String,
            Gujarati: String
        },
        options: [{
            _id  : String,
            Hindi: String,
            English: String,
            Gujarati: String
        }]
    },
    needAssistance: {
        title: {            
                Hindi: String,
                English: String,
                Gujarati: String
            
        },
        description: {
            
                Hindi: String,
                English: String,
                Gujarati: String
            
        },
        questionImgUrl:[{imgUrl: String, _id : String}],
        questionVideoUrl: [{videoUrl : String , _id : String}] 
    },
    buildingsAssociated: [{_id: String}]    

});

module.exports  = mongoose.model('question', questionSchema);
 