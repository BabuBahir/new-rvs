var User = require("../models/user.js");
var registersurveyer = require("../models/registersurveyer.js");
var bcrypt = require('bcrypt');

module.exports = {
 
  index :  function (req, res){
		var data = req.body;		
		registersurveyer.findOne({email : data.email}).exec(function (err, val){ console.log(val);
			if(val=="" || val==null){
				res.send('0');
			} else{
				val.comparePassword(data.password, function (err, isMatch){
                 if(isMatch && !err){
                 	//handle sessions here
                 	req.session.email = val.email;
                 	req.session.name = val.firstname;
                 	req.session.password = val.password;
                 	
                 	console.log("Session here:-"+req.session.name);
             	       res.send('1');	
                 }else	{
                 		res.send('0');	
                 };                 
			   });
                 	
        	};

        });
    
    }, 


 pindex: function (req, res) { 
   	    
		if((req.body.email == "user@gmail.com")&&(req.body.password == "user")){ 	
		 	  			        
				res.send('1');		  			 	
		} else { 
				res.send('0');	
  	};           
  	  
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