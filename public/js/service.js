app.service('DailReport',DailyReport);
DailyReport.$inject=['$http','$q'];

function DailyReport($http,$q,$scope){
    var report=this;
    report.dailyData=[];
    report.table={};
    report.getData=function(){
        console.log("this is data" + report.dailyData);
        return this.dailyData;
    }
        
    report.getRestData=function(){
        $http.get('data.json').then(function (response){
            report.dailyData=response.data;
            console.log("this is data" + report.dailyData);
            console.log(response.data);
            }, function (data){
                console.log(data);
            });
    };
    report.getRestDataWeek=function(){
        $http.get('data1.json').then(function (response){
            report.dailyData=response.data;
            console.log("this is data" + report.dailyData);
            console.log(response.data);
            }, function (data){
                console.log(data);
            });
    };
    report.getRestDataMonth=function(){
        $http.get('data2.json').then(function (response){
            report.dailyData=response.data;
            console.log("this is data" + report.dailyData);
            console.log(response.data);
            }, function (data){
                console.log(data);
            });
    };
    report.TableUpdate=function(){
        
    }
    
    
    
    
}