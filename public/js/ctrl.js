app.controller('appCtrl',AppCtrl);

AppCtrl.$inject=['$scope','DailReport'];
function AppCtrl($scope,DailReport){
    $scope.name="ramesh";
    $scope.dailyData=DailReport.getData();
      DailReport.getRestData();
    $scope.btnGet=function(){
        console.log('GetData');
        DailReport.getRestData();
    };
}
