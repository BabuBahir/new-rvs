angular.module('website', ['ngAnimate', 'ngTouch'])
    .controller('MainCtrl', function ($scope,$http,$sce) {
 
//function to controller with params
$scope.call_slider= function(msg){  
	
		document.getElementsByTagName("video")[0].pause();

	    $scope.currentIndex =0; //.. initiazlizing to zero 
		$scope.currentVideoIndex =0;//
        var fruits = [];
		var reserveFruit =[];
		var videoList=[];
		$scope.showDiv = true;
		$scope.counter=msg;		 
		$scope.reserveData = null; 
		$scope.data = null;
		$scope.img_still_click = false;
        $scope.postImgClick =false;
        $scope.preClick =false;
		$scope.vidDiv = false;   
        $scope.postVideoClick =false; // hide video div on every click on read more
		
	//on click get data from json	
	$http.get('json/data.json').success(function(data) {
	 $scope.data = data;  
	 angular.forEach($scope.data,function(value){
		 if((value.Member == $scope.counter)&&(value.type =='photo')){ 		      
			 var image = value['img'] ;				 
			 fruits.push({image});				 
			 var type = value['type'];
			 var url = value['url'];
			 var solidItem = [image ,type,url];
			 $scope.Desc = value['Desc'];
			 reserveFruit.push(solidItem);			 
		 };
		if((value.Member == $scope.counter)&&(value.type =='video')){ 	 			
			var url = $sce.trustAsResourceUrl(value['url']);
			var img = value['img'];
			videoList.push({url:url,img:img});			 
		};
	});	
	$scope.slides=fruits;  
    $scope.reserveData = reserveFruit;  
	$scope.videoList =videoList;  	
  });	   
};

$scope.img_click= function(msg){	
  $scope.Img_click_src = msg;
  $scope.img_still_click = true;
  $scope.preClick = true;
  $scope.postImgClick =true;
  $scope.postVideoClick =false;
};

$scope.video_click = function(videomsg){ console.log(videomsg);
	$scope.Video_click_src=$sce.trustAsResourceUrl(videomsg);
	$scope.VideoPosterSrc= videomsg.replace("mp4","jpg");
	$scope.Video_still_click = true;	 
    $scope.postImgClick =false;
    $scope.preClick =true;   //hide slider and image clicked divs
    $scope.postVideoClick =true;
};

$scope.customFilter=function(item){	     
	 var Current = $scope.counter;		  
	 if((item.Member == Current)&&(item.type=="photo")) // if not clicked
	 {return true;}
	 else {return false;}
};


$scope.VideoFilter=function(item){	     	
	 var Current = $scope.counter;		  
	 if((item.Member == Current)&&(item.type=="video")) // if not clicked
	 {return true;}
	 else {return false;}
};
  
$scope.direction = 'left';
$scope.currentIndex = 0;
$scope.currentVideoIndex=0;
 
$scope.setCurrentSlideIndex = function (index) {
$scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
$scope.currentIndex = index;
};

$scope.isCurrentSlideIndex = function (index) {
	return $scope.currentIndex === index;
};

$scope.isCurrentvideoIndex = function (index) {
	return $scope.currentVideoIndex === index;
};

$scope.prevSlide = function () {
	$scope.img_still_click = false;  	  
	$scope.direction = 'left';	
	$scope.preClick = false;
	$scope.postImgClick=false;
	$scope.postVideoClick =false;
	if($scope.currentIndex < ($scope.slides.length - 1)){
	  $scope.currentIndex=$scope.currentIndex+1;
	}else { // length finished 
	  $scope.vidDiv = true;
	  $scope.currentIndex=0; 
    };
};

$scope.nextSlide = function () {
    $scope.img_still_click = false;    
	$scope.direction = 'right';
	$scope.preClick = false;
	$scope.postImgClick =false;
    $scope.postVideoClick =false;
	console.log($scope.preClick);
	if($scope.currentIndex>0){
		$scope.currentIndex=$scope.currentIndex-1;
	}else{ //length finished
	   $scope.vidDiv = true;
		$scope.currentIndex =$scope.slides.length - 1;
	}
 
};

$scope.prevVideo = function () {
	$scope.Video_still_click = false;     	
	$scope.direction = 'left';	
        $scope.postVideoClick =false;
	if($scope.currentVideoIndex < ($scope.videoList.length - 1)){
	  $scope.currentVideoIndex=$scope.currentVideoIndex+1;
	}else { 
	  $scope.vidDiv = false;
	  $scope.currentVideoIndex=0; 
    };
};

$scope.nextVideo = function () {
        $scope.Video_still_click = false;
	$scope.direction = 'right';
        $scope.postVideoClick =false;
	if($scope.currentVideoIndex>0){
		$scope.currentVideoIndex=$scope.currentVideoIndex-1;
	}else{ //length finished
	    $scope.vidDiv = false;
		$scope.currentVideoIndex =$scope.videoList.length - 1;
	}
};

	$scope.moveAndSave = function(){
		console.log($scope.counter);
		$http({
			method : "GET",
			url : "/SetBuildingSession/"+$scope.counter,
			async : false,
		}).then(function mySucces(response){ console.log(response.data);
			 location.href = '/addpicture';
		},function	myError(response){

		}); 		 
    };


    })
    .animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });

