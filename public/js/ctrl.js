app.controller('appCtrl',AppCtrl);

AppCtrl.$inject=['$scope','DailReport'];
function AppCtrl($scope,DailReport){
    
      $scope.columns={};
    $scope.dailyData=DailReport.getData();
      DailReport.getRestData();
    $scope.btnGet=function(){
        console.log('GetData');
        DailReport.getRestData();
    };
    $scope.btnUpdate=function(){
        $scope.columns={};
        console.log('btnUpdate');
        $scope.dailyData=DailReport.getData();
        angular.forEach($scope.dailyData,function(row){
            angular.forEach(row,function(val,col){
                   console.log(col); 
                    $scope.columns[col]=col;
            });
        });
        
    };
}
