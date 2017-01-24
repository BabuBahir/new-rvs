angular.module('langapp',[])
    .controller('MainCtrl', function ($scope,$http,$window) {

 $scope.prop = {
    "type": "select",      
    "value": "Select Language", 
    "values": ["Select Language","English", "Gujarati", "Hindi"] 
  };

$scope.updatePath = function(path){
	console.log($scope.prop.value);	
	$http({
		method:"GET",
		url : "/LangaugeSelected/"+$scope.prop.value,
		async : false,		 
	}).then(function mySucces(response){
		$window.location.href = '/3';
	},function	myError(response){

	}); 
	//$window.location.href = '/3';
};

});