app.service('DailReport',DailyReport);
DailyReport.$inject=['$http','$q'];

function DailyReport($http,$q,$scope){
    var report=this;
    var dailyData=[];
    report.getData=function(){
        return this.dailyData;
    }
        
    report.getRestData=function(){
        $http.get('data.json').then(successCallback, errorCallback);
    }
    function successCallback(response){
        this.dailyData=response.data;
//        $apply();
        console.log(response.data);
    }
    function errorCallback(data){
        console.log(data);
    }
    
    
}