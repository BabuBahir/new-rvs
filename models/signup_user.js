 var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userUrl = new Schema({
  name:  String,
  email: String,
  phone: String,
  password :  String
});

userUrl.pre('save', function(next) {	
    var user = this; 
    if (this.isModified('password') || this.isNew) {
        	bcrypt.genSalt(10, function(err, salt) { console.log(user);
	            if (err) {	            	
	                return next(err);
            	}
		        bcrypt.hash(user.password, salt, function(err, hash) {		        	
		                if (err) {
		                    return next(err);  
		                }
		                user.password = hash;                              
		                next();
            });
        });
    } else {    	
        return next();
    }
}); 

userUrl.methods.comparePassword = function(candidatePassword, cb) { 
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) { 
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('signup_user', userUrl);
  
