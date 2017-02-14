  
var registersurveyer = require("../models/registersurveyer.js");
var bcrypt = require('bcrypt');

module.exports = {
 
  index :  function (req, res){
		var data = req.body;		
		registersurveyer.findOne({email : data.email}).exec(function (err, val){   
			if(val=="" || val==null){
				res.send('0');
			} else{
				val.comparePassword(data.password, function (err, isMatch){
                 if(isMatch && !err){
                 	//handle sessions here
                 	req.session.email = val.email;
                 	req.session.name = val.firstname + ' ' + val.lastname;
                 	req.session.password = val.password;
                 	req.session.membershiptype = val.membershiptype;
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
  	 
  	var query = registersurveyer(info);
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