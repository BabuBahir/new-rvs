
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
  } ,


  CaptureAddress : function(req,res){  
    req.session.txtdata = req.body.txtdata ;
    req.session.address = req.body.address ;
    req.session.lat =req.body.lat ;
    req.session.lng =req.body.lng;
    req.session.localauth = req.body.localauth;
   
      if(req.body.txtdata == req.body.address){
        res.send('Fail');
      }
      else{
        res.send('Pass');
      }
  },

  MoveToSupport : function(req,res){
     req.session.PageToSupport  = req.body.PageToSupport;
     res.send(req.session.PageToSupport);
  },

  getPreviousOfSupport : function(req,res){       
      res.send(req.session.PageToSupport);
  }

};
