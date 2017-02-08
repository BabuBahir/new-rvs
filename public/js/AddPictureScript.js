angular.module('AddPictureapp',['angularFileUpload']).controller('MainCtrl', function ($scope,$http ,$upload ) {
    

	$.cloudinary.config({cloud_name: "dcu5hz0re", upload_preset: 'fbesyowr'});  //cloudinary config.

	$scope.$watch('files_1', function () {    //1st Image Watch
        $scope.upload($scope.files_1, 1);
    });

    $scope.$watch('files_2', function () {    //2nd Image Watch
        $scope.upload($scope.files_2 , 2);
    });

    $scope.$watch('files_3', function () {    //3rd Image Watch
        $scope.upload($scope.files_3 , 3);
    });

    $scope.$watch('files_4', function () {    //4th Image Watch
        $scope.upload($scope.files_4 , 4);
    });

    $scope.$watch('files_5', function () {    //5th Image Watch
        $scope.upload($scope.files_5 , 5);
    });


    $scope.upload = function (files , imgIndex) {  
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
                    $scope.ShowProgressBarbyIndex(imgIndex, progressPercentage); 
                                      
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);

                }).success(function (data, status, headers, config) { 
                   $scope.HideProgressBarbyIndex(imgIndex);
                   $scope.ShowImagebyindex(imgIndex);

                   $scope.UpdateSurveyRecord(data, imgIndex);
                    console.log('file ' + config.file + 'uploaded. Response: ' + data);
                });

                
            }
        }
    };


    $scope.ShowProgressBarbyIndex = function(imgIndex,progressPercentage){
         var progressStr = 'progressPercentage'+'_'+imgIndex;
         $scope[progressStr] = progressPercentage ; 
    };

    $scope.HideProgressBarbyIndex = function(imgIndex){
            var progressStr = 'progressPercentage'+'_'+imgIndex;
         $scope[progressStr] = !$scope[progressStr];
    };


    $scope.ShowImagebyindex = function(imgIndex){
        var ImgDoneStr = 'ImgDone'+'_'+imgIndex;

        $scope[ImgDoneStr] =  !$scope[ImgDoneStr];
    };

    $scope.HideImageByIndex = function(imgIndex){
        var ImgDoneStr = 'ImgDone'+'_'+imgIndex;

        $scope[ImgDoneStr] =  !$scope[ImgDoneStr]
    };

    $scope.UpdateImageSrcByIndex = function(data , imgIndex){

        var myImgStr = "myImgVar"+'_'+imgIndex;
        
        $scope[myImgStr].url = data.url;
        $scope[myImgStr].id  = data.public_id;
    };


    $scope.UpdateSurveyRecord = function(data , imgIndex){

        //setting up myImgVar        
        $scope.UpdateImageSrcByIndex(data , imgIndex);

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

    $scope.Delete_img = function(msg,imgIndex){
        var r = confirm("Do you want to Delete this Image!");   
        if (r == true) {              
            $http({
            method : "POST",
            url : "/Delete_Surveyimg" ,
            async : false,
            data:({"image_id":msg })
            }).then(function mySucces(response) {   
                $scope.HideImageByIndex(imgIndex);   // Hide Image   
               //$scope.myWelcome = response.data; 
                document.getElementsByClassName(msg).style.display = 'none';
                console.log(msg);  
            }, function myError(response) {
              $scope.myWelcome = response.statusText;
            });  
            };
    };

});