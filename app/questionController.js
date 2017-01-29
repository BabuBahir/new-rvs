var question = require("../models/question.js");
var  survey = require("../models/survey.js"); 
var buildingType = require("../models/buildingType.js");

module.exports = { 
  index: function (req, res) {   
  	var selectedBuilding =  req.session.BuildingName;       
      question.find({'buildingsAssociated._id': selectedBuilding}, function(err, data){  
        var Language =  req.session.languageSelected ;                          
        res.render('general_Info-Form',{ rawData: data , Language : Language});
      });        
  },

  SaveGeneralInfo : function(req,res) {
  	console.log(13);
  },

  AjaxInsertGeneralInfo : function(req,res){
    var AnswerObj =  req.body.AnswerObj;       // getting the AnswerObj from req body
    var surveyQUestionsArr = [];

          survey.find({_id:"1485424288506"} , function(surveyErr , surveyData){   //get current survey from sessions
                var selectedBuilding =  'Rcc'; //req.session.BuildingName;  
                question.find({'buildingsAssociated._id': selectedBuilding}, function(err, data){

                    for(var i=0 ; i < AnswerObj.length; i ++){ 
                      surveyQUestionsArr.push({ _id : data[(AnswerObj[i].Q_index)]._id , QuestionText: data[(AnswerObj[i].Q_index)].question.text.English , OptionSelected : AnswerObj[i].Answer});                                   
                    };

                survey.update({_id:"1485424288506"} , {$set: {'QuestionsAnswered' : surveyQUestionsArr}},function(err , result){
                   res.send(result);  //sending result 
                });
            });
    });
  } ,
  
  getPopModal : function(req,res) {  

    var selectedBuilding =  req.session.BuildingName;
    var Language =  req.session["languageSelected"];

    if(Language == null){  // if no language selected choose English
      Language = req.session["languageSelected"] = 'English';
    };
         
    var LastQID = req.params.LastQID ;
 
     question.find({_id : LastQID}, function(err,data){ 
        res.render('popModal' ,{ selectedBuilding : selectedBuilding , rawData : data[0] , Language : Language , LastQID : LastQID });
     });
 
  }
};
