var cloudinary = require('cloudinary'); 
var buildingType = require("../models/buildingType.js");
var fs = require('fs');

cloudinary.config({
    cloud_name: 'dcu5hz0re',
    api_key: '812825971867232',
    api_secret: '_pk-gzAhdI63mSU1FDXIkrXkABo'
});

var dummyData = "";var imgurlArray=[];

module.exports = {
  index: function (req, res) {     
      buildingType.find({}, function(err, data){    read_from_file();     
        res.render('select',{drinks:data[0].name , desc:data[0].description , posts:data[0].buildingImgUrl});                     
      });        
  } 
};



function write_to_file(data){
	data = JSON.stringify(data);	
	var stream = fs.createWriteStream("my_file.txt");
	stream.once('open', function(fd) {
	stream.write(data);	 
	stream.end();
	});
	console.log('writen to file');
};

function read_from_file(){	 
var obj = JSON.parse(fs.readFileSync('my_file.json', 'utf8'));
console.log(obj.buildingImgUrl);
};
