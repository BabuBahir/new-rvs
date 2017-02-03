var user = require("../models/user.js");
var bcrypt = require('bcrypt');

module.exports = {
  index: function (req, res) { 
 
  	user.findOne({name:"user"}, function(err, data){  		
  		var salt = bcrypt.genSaltSync(10);// Hash the password with the salt
		var hash = bcrypt.hashSync("papa", salt);		 
		if(req.body.email == "user@gmail.com"){ 
			data.comparePassword(req.body.password, function (err, isMatch) {
			if (isMatch && !err) {
				//store whatever you need to store in the locals or session
				sess = req.session;
				sess.user = req.body.email;			        
				res.redirect('/2');
			  }
			else{ console.log('false');res.send('Wrong password'); }
			});		
		} else { res.redirect('/'); };
  	});           
  	  
  },


  Saltify : function(req,res){
  	    var salt = bcrypt.genSaltSync(10);// Hash the password with the salt
  		var hash = bcrypt.hashSync("user", salt);
  		res.send(hash);
  }

}  