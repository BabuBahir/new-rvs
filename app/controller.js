var cloudinary = require('cloudinary'); 
var buildingType = require("../models/buildingType.js");
var fs = require('fs');
var dataArr = [];

cloudinary.config({
    cloud_name: 'dcu5hz0re',
    api_key: '812825971867232',
    api_secret: '_pk-gzAhdI63mSU1FDXIkrXkABo'
});

var dummyData = "";var imgurlArray=[];

module.exports = {
  index: function (req, res) {     
      buildingType.find({}, function(err, data){   write_to_file(data);     
        res.render('select',{drinks:data[0].name , desc:data[0].description , posts:data[0].buildingImgUrl});                     
      });        
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
  return str;
};

function makeImageOfVideoUrl(str){
  str = str.replace("https","http");
  return str;
};

function makeImageHttps(str){
  str = str.replace("http","https");
  return str;
};