var cloudinary = require('cloudinary'); 
var buildingType = require("../models/buildingType.js");
var survey = require("../models/survey.js");
var fs = require('fs');
var dataArr = [];
var pseudoID = Date.now();

cloudinary.config({
    cloud_name: 'dcu5hz0re',
    api_key: '812825971867232',
    api_secret: '_pk-gzAhdI63mSU1FDXIkrXkABo'
});
 
var dummyData = "";var imgurlArray=[];

module.exports = {
  index: function (req, res) {    

    buildingType.find({}).sort({'orderIndex':-1}).exec(function(err,data){   write_to_file(data);               
         var Language =  req.session["languageSelected"];
         
         if(Language == null){  // if no language selected choose English
            Language = req.session["languageSelected"] = 'English';
         };

         var MasonaryObj = [];
         data.forEach(function(o){if (o._id == 'Masonry') MasonaryObj.push(o);} );

         var RccObj = [] ;
         data.forEach(function(o){if (o._id == 'Rcc') RccObj.push(o);} );

         var SteelObj = [] ;
         data.forEach(function(o){if (o._id == 'Steel') SteelObj.push(o);} );

         var CompositeObj = [] ;
         data.forEach(function(o){if (o._id == 'Composite') CompositeObj.push(o);} );
 
        res.render('select',{drinks:data[0].name , desc:data[0].description , posts:data[0].buildingImgUrl , Language : Language , MasonaryObj : MasonaryObj , RccObj : RccObj , SteelObj : SteelObj , CompositeObj : CompositeObj });                     
      });        
  },


  UpdateSurveyRecord : function(req,res) {
     var LastSurveyID = req.session.LastSurveyID =1485424288506; 

     var imgObj = req.body.data;

     var newImgArray = [];

     survey.find({_id : LastSurveyID} , function (err , result){
            newImgArray= result[0].survey_img;
            newImgArray.push({_id : imgObj.public_id , imgUrl : imgObj.url});
            

            survey.update({_id:LastSurveyID} , {$set: {'survey_img' : newImgArray }},function(err , result){
                   res.send(result);  //sending result 
                });
        });
  },

 Delete_Surveyimg : function(req,res){

    var imageId = req.body.image_id;  
      cloudinary.v2.uploader.destroy(imageId, function (error, result) {  ;
             survey.update({_id: '1485424288506'}, { $pull: { survey_img : { _id : imageId } } },{ safe: true }, function(err, test){                                        
                        if(err){res.send(err)};    
                        console.log(test);                                       
                        res.send("done");
                  });  
          });
 },

  UploadImage : function(req,res) {  
    if(req.files.first_image.type=="image/jpeg") {   // check if image is uploaded... if yes upload to cloudinary..else redirect        
           cloudinary.v2.uploader.upload(req.files.first_image.path,
                { width: 300, height: 300, crop: "limit", tags: req.body.tags, moderation:'manual' },
                function(err, result) {        // call back after uploading image to cloudinary                     
                    
                 var newSurvey = new survey({_id : pseudoID });
                 var sess = req.session; 
                 var buildingTypeStr = sess.BuildingName;   // get Building Type

                 newSurvey.building_type.push({_id : buildingTypeStr});

                 newSurvey.survey_img.push({_id : result.public_id , imgUrl : result.url});
                 
                 newSurvey.save(function(err){
                      if(err ){
                          return err;
                      }
                      else {
                         sess = req.session;
                         sess.LastSurveyID = newSurvey._id;                          
                         res.redirect('/showform');
                      };
                 });
            });
        }else {
           console.log('No files');
        };
    }

};



function write_to_file(data){	
  dataArr= [];   //intializing array to zero 
  newdata = modify(data);
  fs.writeFileSync('public/json/data.json',JSON.stringify(newdata));   
};

function modify(data){	 
  for(a=0;  a<4 ; a++){   //looping 4 building types
    for(i=0;i<data[a].buildingImgUrl.length;i++){       //for image
       var singleObj = {Member:data[a]._id,Desc: data[a].description.English ,Prefix:"",type:"photo",img:makeImageHttps(data[a].buildingImgUrl[i].imgUrl)} ;
        dataArr.push(singleObj);
    }; 

    for(i=0;i<data[a].buildingVideoUrl.length;i++){
      var singleObj = {Member:data[a]._id,Prefix:"",type:"video",img:makeImageOfVideoUrl(data[a].buildingVideoUrl[i].videoUrl),url:make_video_url(data[a].buildingVideoUrl[i].videoUrl)}; 
       dataArr.push(singleObj);
    };  
};
return dataArr;
};

function make_video_url(str){
  str= str.replace("jpg","mp4");
  //str = str.replace("http","https");
  return str;
};

function makeImageOfVideoUrl(str){
 // str = str.replace("http","https");
  return str;
};

function makeImageHttps(str){
  str = str.replace("http","https");
  return str;
};