var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
  host: 'smtp-pulse.com',
  port: 465,
  secure: true, // use SSL
  auth: {
      user: 'kaminikamaliem@gmail.com',
      pass: 'makZqnAqmSWi'
  }
});

module.exports = smtpTransport;
