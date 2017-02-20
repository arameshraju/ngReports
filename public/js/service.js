app.service('feedDataService',FeedDataService);
app.service('feedDataListService',FeedDataListService);

FeedDataListService.$inject=['$q','feedDataService'];
function FeedDataListService($q,feedDataService){
var service=this;
     var feedData = {};
    

    service.importData = function (name, quantity) {
    var r1Promise = feedDataService.importR1Data('fd','td');
    var r2Promise = feedDataService.importR2Data('fd','td');
    var r3Promise = feedDataService.importR3Data('fd','td');
    var r4Promise = feedDataService.importR4Data('fd','td');
    $q.all([r1Promise, r2Promise,r3Promise,r4Promise]).
    then(function (response) {
        console.log('Data :' + response);
//      var item = {
//        response.key:
//        response.value
//      };
        angular.forEach(response,function(val){
            if(val.r1 )feedData.r1=val.r1;
            if(val.r2 )feedData.r2=val.r2;
            if(val.r3 )feedData.r3=val.r3;
            if(val.r4 )feedData.r4=val.r4;
           
        });
            console.log(feedData);
      
    })
    .catch(function (errorResponse) {
      console.log(errorResponse.message);
    });
  };

  service.removeItem = function (itemIndex) {
    feedData.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return feedData;
};
service.setItemsEmpty = function () {
    console.log("Empty");
    feedData={};
};
};
        
    


FeedDataService.$inject = ['$q', '$timeout','$http'];
function FeedDataService($q,$timeout,$http){
  var service=this;
    service.importR1Data = function (fromDate,toDate) {
    var deferred = $q.defer();
    var feedData = {};
    $http.get('data.json').then(function (response){
             deferred.resolve({r1:response.data});
            }, function (data){
              deferred.reject(data);
    });

    return deferred.promise;
  };
    service.importR2Data = function (fromDate,toDate) {
    var deferred = $q.defer();
    var feedData = [];
    $http.get('data1.json').then(function (response){
                deferred.resolve({r2:response.data});
            }, function (data){
              deferred.reject(data);
    });

    return deferred.promise;
  };
    service.importR3Data = function (fromDate,toDate) {
    var deferred = $q.defer();
    var feedData = [];
    $http.get('data2.json').then(function (response){
               deferred.resolve({r3:response.data});
            }, function (data){
              deferred.reject(data);
    });

    return deferred.promise;
  };
    service.importR4Data = function (fromDate,toDate) {
    var deferred = $q.defer();
    var feedData = [];
    $http.get('data2.json').then(function (response){
             deferred.resolve({r4:response.data});
            }, function (data){
              deferred.reject(data);
    });

    return deferred.promise;
  };


    
};




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
