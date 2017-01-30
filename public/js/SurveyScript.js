angular.module('SurveyApp',[])
    .controller('MainCtrl', function ($scope,$http , $rootScope) {
//SurveyScript
$scope.RandomTime = Math.random();  //generate Random numbers for Unique ID


$scope.updatePath = function(msg){	 
var Answers = [];

	 for(var i=0 ; i < msg ; i ++)
	 {
	 	var SelectM = "SelectM"+i;
	 	var TextTypeM= "TextTypeM"+i;

	 	 if($scope[SelectM] != null){		 	 	 
	 	 	Answers.push({Answer : $scope[SelectM], Q_index : i});
	 	 };
	 	 if($scope[TextTypeM] != null){
	 	 	Answers.push({Answer : $scope[TextTypeM], Q_index : i});
	 	 };
	 	 
	 };

    Answers = jQuery.parseJSON(JSON.stringify(Answers));   // Stringifyin to JSON 

	$http({
	method:"POST",
	url : "/AjaxInsertGeneralInfo",
	async : false,
	dataType: "json",		 
	data : ({"AnswerObj" : Answers}),
	}).then(function mySucces(response){
	 	 location.href = "/general_techincal";

	},function	myError(response){

	}); 	 
};


	$scope.NA_UpdateQId = function(msg){
		$scope.RandomTime = Math.random();  //generate Random numbers for Unique ID
		$scope.last_Qid = msg;
	};

	$rootScope.ShowNextMedia = function(CrntIndex){  console.log(CrntIndex);
		 
		var CrntDivStr = "ImageMedia" +CrntIndex;
		document.getElementById(CrntDivStr).style.display = "none";

		var NextDivStr = "ImageMedia" + (eval(CrntIndex) - 1);

		if(CrntIndex == 0){
			var cusid_ele = document.getElementsByClassName('ImgDivPopUp');
			cusid_ele[0].style = null;

				$rootScope.MediaTab = !$rootScope.MediaTab;
		}else {
			document.getElementById(NextDivStr).style = null;
		};
			 
	};


	$rootScope.ShowNextVIDEO = function(CrntIndex){  
		 
		var CrntDivStr = "VideoMedia" +CrntIndex;
		document.getElementById(CrntDivStr).style.display = "none";

		var NextDivStr = "VideoMedia" + (eval(CrntIndex) - 1);

		if(CrntIndex == 0){  
				var cusid_ele =document.getElementsByClassName("VideoDivPopUp");
				cusid_ele[0].style = null;
				
				$rootScope.MediaTab = !$rootScope.MediaTab;
		}else {
			document.getElementById(NextDivStr).style = null;
		};
			 
	};

});