angular.module('AddPictureapp',['angularFileUpload']).controller('MainCtrl', function ($scope,$http ,$upload ) {



	$.cloudinary.config({cloud_name: "dcu5hz0re", upload_preset: 'fbesyowr'});
	$scope.$watch('files', function () { 
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) { 
        if (files && files.length) {  console.log(22);
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                console.log(file);
                 
                $upload.upload({
                    url: 'https://api.cloudinary.com/v1_1/'+ $.cloudinary.config().cloud_name +'/image'+'/upload',
                    fields: {'cloud_name': $.cloudinary.config().cloud_name , upload_preset: 'fbesyowr' },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);  
                    $scope.progressPercentage = progressPercentage ;
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) { 
                   $scope.ImgDone =  !$scope.ImgDone;
                    $scope.UpdateSurveyRecord(data);
                    console.log('file ' + config.file + 'uploaded. Response: ' + data);
                });

                
            }
        }
    };


    $scope.UpdateSurveyRecord = function(data){

        //setting up myImgVar
        $scope.myImgVar.url = data.url;
        $scope.myImgVar.id  = data.public_id;

        //then updating via ajax
        $http({
        method : "POST",
        url : "/UpdateSurveyRecord" ,
        async : false,
        data:({"data":data})
        }).then(function mySucces(response) {

           //$scope.myWelcome = response.data;
        }, function myError(response) {
          $scope.myWelcome = response.statusText;
        });
    };

    $scope.Delete_img = function(msg){
        var r = confirm("Do you want to Delete this Image!");   
        if (r == true) {              
            $http({
            method : "POST",
            url : "/Delete_Surveyimg" ,
            async : false,
            data:({"image_id":msg })
            }).then(function mySucces(response) {      
               //$scope.myWelcome = response.data; 
                document.getElementsByClassName(msg).style.display = 'none';
                console.log(msg);  
            }, function myError(response) {
              $scope.myWelcome = response.statusText;
            });  
            };
    };

});