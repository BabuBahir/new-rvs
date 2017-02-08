var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config')[process.env.NODE_ENV || 'development'];

module.exports = {
  getChangePass: function (req, res) {
    var token = req.params.token;
    var decoded = jwt.decode(token);
    res.render('changepass', {
      token: token,
      handle: decoded.handle
    })
  },

  postChangePass: function (req, res) {
    var token = req.body.token;
    var newpass = req.body.newpass;
    console.log(newpass)
    jwt.verify(token, config.secret, function (err, decoded) { console.log(decoded);
      if (err) {
        return res.json({error: true, message: "Invalid or Expired Token!", reason: err});
      }
      var handle = decoded.handle;console.log(handle);
        console.log(handle)

      // Now change password in DB
      User
      .findOne({email: handle})
      .then(function (user) {
        user.password = newpass;console.log(user);
        return user.save();
      })
      .then(function (savedUser) {
        return res.json({error: false, savedUser: savedUser});
      })
      .catch(function (err) {
        console.log(err);
        return res.json({error: true, message: "Failed to change password for " + handle, reason: err });
      })
    })
  }
}
