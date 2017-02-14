 var Register = require("../models/registersurveyer.js");
///var SignupUser = require("../models/signup_user.js");
//var bcrypt = require('bcrypt'); 

module.exports = {
  reguser: function (req, res) {
  	var info = req.body;
  	 
  	var query = Register(info);
		query.save(function (err, val){
			if(err){
				console.log(err);
				return res.send({result : "error"});
				
			}
			else{
				req.session.mail = val.email;
				req.session.mem = val.membershiptype;
				 
				res.send({result : "user successfully registered", data : req.session.mail });
				 

			}
		});
	
	   //res.send('user registered');
	  // res.render('login');
  	
  }


}  