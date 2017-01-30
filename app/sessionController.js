
module.exports = {

  CreateLanguageSession: function (req, res) {     
      langId = req.params.langId
      sess = req.session;   //setting sessions 
      sess.languageSelected = langId;       
      res.send(sess);
  }, 

  CreateBuildingSessions : function(req,res) {
  	  BuildingName = req.params.BuildingName
      sess = req.session;   //setting sessions 
      sess.BuildingName = BuildingName;       
      res.send(sess);
  }
};
