var question = require("../models/question.js");
  
module.exports = {
  index: function (req, res) {   

  	var selectedBuilding = 'Masonry'; //req.session["BuildingName"] ;  
      question.find({'buildingsAssociated._id': selectedBuilding}, function(err, data){  
        var Language =  'English'; //req.session.BuildingName ;                  
        for(var i =0;i< data.length ; i ++) {
        	console.log(data[i]);
        };
        res.render('general_Info-Form',{ rawData: data , Language : Language});
      });        
  }  
};
