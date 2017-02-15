var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var controller = require('./controller');
var login = require('./login');
var change = require('./changepass');
var registeruser = require('./register');
var changepwd = require('./passViews/changepwd');
var questionController = require('./questionController');
var sessionController = require('./sessionController');
var nodemailer = require('nodemailer');
 
module.exports = function(app) {
 
    app.get('/', function(req, res) {
        res.render('signin');
    });
    //welcome page
    app.get('/welcome', function(req, res) {
        res.render('welcome', { member: req.session.mem, email: req.session.mail });
    });

    app.get('/2', function(req, res) {
        res.render('select_language.html', { FUllName: req.session.name , membership: req.session.membershiptype });
    });

    app.get('/map', function(req, res) {
        res.render('map1', { FUllName: req.session.name , membership: req.session.membershiptype });
    });

    app.get('/reg', function(req, res) {
        res.render('registerSurveyor');
    });

    app.get('/SurveyDone' , function(req, res) {
        res.render('SurveyDone.html' , { FUllName: req.session.name , membership: req.session.membershiptype });
    });


    app.get('/LangaugeSelected/:langId', sessionController.CreateLanguageSession);

    app.get('/SetBuildingSession/:BuildingName', sessionController.CreateBuildingSessions);

    app.get('/3', function(req, res) {
        res.render('3)choose_Assessment.html', { FUllName: req.session.name , membership: req.session.membershiptype });
    });

    app.get('/4', function(req, res) {
        res.render('4)new_Survey_Or_survey_History.html', { FUllName: req.session.name , membership: req.session.membershiptype });
    });


    app.get('/report', function(req, res) {
        res.render('report_Format.html', { FUllName: req.session.name , membership: req.session.membershiptype });
    });

    app.get('/signup', function(req, res) {
        res.render('signup');
    });

    app.get('/support' , function(req,res){
        res.render('support' , { FUllName: req.session.name , membership: req.session.membershiptype });
    });
    // app.post('/user_passwordchange', changepass.getChangePass);
    //use this
    app.get('/changepass/:token', change.getChangePass);
    
    app.post('/changepass', change.postChangePass);

    app.get('/history', function(req, res) {
        res.render('5)survey_History.html' , { FUllName: req.session.name , membership: req.session.membershiptype });
    });

    app.get('/addpicture', function(req, res) {
        res.render('add_Picture.html', { FUllName: req.session.name , membership: req.session.membershiptype });
    });

    app.get('/showform', questionController.index);

    app.get('/general_techincal', questionController.genTechindex);

    app.get('/seismic_Assessment', questionController.seismicIndex);

    app.get('/newsurvey', controller.index);

    app.get('/getPopModal/:LastQID?/:RandomTime?', questionController.getPopModal);


    //---some post   ------------------------------------ post post post post 

    app.post('/MoveToSupport' , sessionController.MoveToSupport); 

    app.post('/CaptureAddress', sessionController.CaptureAddress);

    app.post('/Delete_Surveyimg', controller.Delete_Surveyimg);

    app.post('/UpdateSurveyRecord', controller.UpdateSurveyRecord);

    app.post('/AjaxInsertGeneralInfo', questionController.AjaxInsertGeneralInfo);

    app.post('/SaveGeneralInfo', questionController.SaveGeneralInfo);

    app.post('/UploadImage', multipartMiddleware, controller.UploadImage);

    app.post('/UserLogin', login.index);

    app.post('/user_signup', login.adduser);

    app.post('/login', function(req, res) {
        sess = req.session;
        sess.email = req.body.email;
        res.end('done');
    });
    
    app.post('/mymail', changepwd.postSendChangePassword);
    
    app.post('/', function(req, res) {
        console.log(req.body.user.name);
        console.log(req.body.user.email);
        res.send('done');
    });

    app.post('/regsurvey', registeruser.reguser);

    app.post('/sendRegisterMail' , changepwd.sendRegisterMail);

    app.get('/admin', function(req, res) {
        sess = req.session;
        if (sess.email) {
            res.write('<h1>Hello ' + sess.email + '</h1><br>');
            res.end('<a href=' + '/logout' + '>Logout</a>');
        } else {
            res.write('<h1>Please login first.</h1>');
            res.end('<a href=' + '/' + '>Login</a>');
        }

    });

    app.get('/logout', function(req, res) {

        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });

    });

}
