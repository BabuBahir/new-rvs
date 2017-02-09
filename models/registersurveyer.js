 var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var config = require('../config')[process.env.NODE_ENV || 'development'];
//var awsEndpoint = config.aws.s3Endpoint + '/';
//var awsBucket = config.aws.imageBucketName;

var UserSchema = new mongoose.Schema({

    prefix: {
        type: String        
    },

    firstname: {
        type: String
        //required: true
    },
    middlename: {
        type: String
        //required: false
    },
    lastname: {
        type: String
        //required: true
    },
    postaladdress: {
        type: String
        //required: true
    },
    street: {
        type: String
        //required: true
    },
    city: {
        type: String
        //required: true
    },
    state: {
        type: String
        //required: true
    },
    country: {
        type: String
        //required: true
    },
    pincode: {
        type: String
        //required: true
    },
    qualification: {
        type: String
        //required: true
    },
    membershiptype: {
        type: String,
        default : "Non-Professional Surveyor"
        
    },
    email: {
        type: String,
        //lowercase: true,
        unique: true,
        required: true
    },
    phone: {
        type: String
    },

    
    password: {
        type: String,
        required: true
    }
});
    

// Save user's hashed password
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function () {

            }, function (err, hash) {
                if (err) {
                    return next(err);
                }
                // saving actual password as hash
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// compare two password

UserSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('registersurveyer', UserSchema);
