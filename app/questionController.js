var question = require("../models/question.js");
  
module.exports = {
  index: function (req, res) {   

  	var selectedBuilding =   req.session.BuildingName;  
      question.find({'buildingsAssociated._id': selectedBuilding}, function(err, data){  
        var Language =  req.session.languageSelected ;                          
        res.render('general_Info-Form',{ rawData: data , Language : Language});
      });        
  }  
};
