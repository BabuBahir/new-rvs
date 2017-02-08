var User = require("../models/user.js");
///var SignupUser = require("../models/signup_user.js");
var bcrypt = require('bcrypt');

module.exports = {
	/*
  index: function (req, res) { 
   var info = req.body;
    
	user.find({email: req.body.email}, function(err, data){  
		//console.log(data[0].email)
		if(req.body.email == data[0].email){     //console.log(data);
			data[0].comparePassword(req.body.password, function (err, isMatch) {//console.log(data[0].password);
			if (isMatch && !err) { 
				//store whatever you need to store in the locals or session
				//sess = req.session;
				//sess.user = req.body.email;	
				
				             req.session.email = data[0].email;	        
				res.redirect('/2');
			  }
			else{ console.log('false');res.send('Wrong password'); }
			});		
		} else { res.redirect('/'); };
  	}); 
  },*/
  index :  function (req, res){
		var data = req.body;
		console.log(data.password);
		User.findOne({email : data.email}).exec(function (err, val){
			if(val=="" || val==null){
				return res.send("No such user exists");
			}
			if(err){
				console.log("error");
			}
            
				val.comparePassword(data.password, function (err, isMatch){
                 if(isMatch && !err){
                 	//handle sessions here
                 req.session.email = val.email;
                 req.session.name = val.name;
                 req.session.password = val.password;
                 	
                 	console.log("Session here:-"+req.session.name);
                 	      return res.json({error : false, name : req.session.name});
                 }
                 
                 	res.send("password mismatch");
                 	
		        });

        });
    
    },

  adduser: function (req, res) {
  	var info = req.body;
  	console.log(info);
  	var query = User(info);
		query.save(function (err, val){
			if(err){
				res.send("error");
				console.log("error");
			}
			else{
				console.log("you submitted-----" + val);
			}
		});
	
	   res.send('user signed up');
	  // res.render('login');
  	
  }


}  