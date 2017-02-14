app.controller('appCtrl',AppCtrl);

AppCtrl.$inject=['$scope','DailReport'];
function AppCtrl($scope,DailReport){
    //Chart Data
     $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100];
    
    // Chart 
    $scope.lccolors = ['#45b7cd', '#ff6384', '#ff8e72'];

    $scope.lclabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $scope.lcdata = [
      [65, -59, 80, 81, -56, 55, -40],
      [28, 48, -40, 19, 86, 27, 90]
    ];
    $scope.datasetOverride = [
      {
        label: "Bar chart",
        borderWidth: 1,
        type: 'bar'
      },
      {
        label: "Line chart",
        borderWidth: 3,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        type: 'line'
      }
    ];
    // Bar chart
     $scope.blabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.bseries = ['Series A', 'Series B'];

  $scope.bdata = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
    // Chart end
    
    
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
