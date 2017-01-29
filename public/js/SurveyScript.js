angular.module('SurveyApp',[])
    .controller('MainCtrl', function ($scope,$http) {
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
		console.log(msg);
		$scope.last_Qid = msg;
	};
});