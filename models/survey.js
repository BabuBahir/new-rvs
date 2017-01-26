var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
  _id : String,
  userId:  String,
  datetime: String,
  status: String,
  QuestionsAnswered : [
  		{
  			QuestionText : String,
  			OptionSelected : String ,
  			_id : String
  		}
  ],
  building_type : [
				  	 {
				  	 	_id :String
				  	 }
				  ],
  survey_img : [ { imgUrl :String  , _id : String } ],
  generalTechnicalInfo : [ 
  	{
      
  	}
  ] ,
  addressInfo : {
  	 city : String,
  	 LocalAuthority : String,
  	 Latitude : String,
  	 EarthquakeZone : String,
  	 SoilGrade  : String 
  }
});

module.exports  = mongoose.model('Survey', SurveySchema);
 
