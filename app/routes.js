var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var controller = require('./controller');
var login =  require('./login');
var questionController = require('./questionController');
var sessionController = require('./sessionController');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('1)sign_In.html');
    });

    app.get('/2', function(req, res) {
        res.render('2)select_Language.html');
    });
 
    app.get('/LangaugeSelected/:langId', sessionController.CreateLanguageSession);

    app.get('/SetBuildingSession/:BuildingName' , sessionController.CreateBuildingSessions);

    app.get('/3', function(req, res) { 
        res.render('3)choose_Assessment.html');
    });
 
    app.get('/4', function(req, res) {  
        res.render('4)new_Survey_Or_survey_History.html');
    });
 

    app.get('/report',function(req,res) {
        res.render('report_Format.html');
    });


    app.get('/history', function(req, res) {
        res.render('5)survey_History.html');
    }); 
  
    app.get('/addpicture', function(req, res) {  
        res.render('add_Picture.html');
    });

    app.get('/showform',questionController.index);

    app.get('/general_techincal',questionController.genTechindex);

    app.get('/seismic_Assessment', questionController.seismicIndex);

    app.get('/newsurvey',controller.index);

    app.get('/getPopModal/:LastQID?/:RandomTime?' , questionController.getPopModal);

    
    //---some post   ------------------------------------ post post post post 

    app.post('/Delete_Surveyimg' , controller.Delete_Surveyimg);

    app.post('/UpdateSurveyRecord', controller.UpdateSurveyRecord);
    
    app.post('/AjaxInsertGeneralInfo', questionController.AjaxInsertGeneralInfo);

    app.post('/SaveGeneralInfo' , questionController.SaveGeneralInfo);

    app.post('/UploadImage' ,multipartMiddleware , controller.UploadImage);

    app.post('/UserLogin' , login.index);

    app.post('/login', function(req, res) {
        sess = req.session;
        sess.email = req.body.email;
        res.end('done');
    });

    app.post('/', function(req, res) {
        console.log(req.body.user.name);
        console.log(req.body.user.email);  
        res.send('done');       
    });

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
