var User = require('../../models/registersurveyer');
var jwt = require('jsonwebtoken');
var config = require('../../config')[process.env.NODE_ENV || 'development'];
var mailer = require('../../mailer');

module.exports = {

    postSendChangePassword: function(req, res) {
        var payload = {
            handle: req.body.email.toLowerCase()
        };

        User.count({ email: req.body.email.toLowerCase() }, function(err, count) {

            if (err || !count) {
                return res.json({
                    complete: false,
                    error: true,
                    message: `No user with email '$(req.body.email)' exist in our Database!`
                })
            };

            var token = jwt.sign(payload, config.secret, { expiresIn: '1h' });

            var TinyURL = require('tinyurl');


            TinyURL.shorten('https://rvs-staging.herokuapp.com' + '/changepass/' + token, function(shorturl) {
                var locals = {
                    to: req.body.email,
                    subject: 'Password Change Request for DonateMyTime',
                    handle: req.body.email,
                    changePassURL: shorturl
                };

                 console.log(shorturl);

                var htmlMsg = `<p>To change login password for <strong>${req.body.handle}</strong> as requested, please visit:</p>`;
                htmlMsg += `<p> ${shorturl} </p>`;
                htmlMsg += `<p>The link expires in about an hour.</p>`;
                htmlMsg += `<p>Please ignore this message if you didn't request the password change.</p>`;

                var mailOpts = {
                    from: "kaminikamaliem@gmail.com",
                    to: req.body.email,
                    subject: 'Password Change Request for rvs',
                    html: htmlMsg
                }

                mailer.sendMail(mailOpts, function(err, info) {
                    if (err) {
                        console.log('Mailing error: ', err);
                    }
                    console.log('Mailing....', info);
                })

            })
            return res.json({ complete: true })
        })
    },

    sendRegisterMail: function(req, res) {  

             var htmlMsg = `<p>Thank You for registration ${req.body.firstname}  , please visit:</p>`;
                htmlMsg += `<p> https://rvs-staging.herokuapp.com </p>`;
                htmlMsg += `<p>using your Credentials </p>`;
                htmlMsg += `<p> .</p>`;

                var mailOpts = { 
                    from: "kaminikamaliem@gmail.com",
                    to: req.body.email,
                    subject: 'Registration Successfull',
                    html: htmlMsg
                }

                mailer.sendMail(mailOpts, function(err, info) {
                    if (err) {
                        console.log('Mailing error: ', err);
                    }
                    console.log('Mailing....', info);
                })

            return res.json({ complete: true })
        }
    
}
