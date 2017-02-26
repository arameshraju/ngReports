app.service('feedDataService',FeedDataService);
app.service('feedDataListService',FeedDataListService);

FeedDataListService.$inject=['$q','feedDataService','$filter'];
function FeedDataListService($q,feedDataService,$filter){
var service=this;
     var feedData = {};
    var FeedProductData={}
     var feedConsolidation = [];
    

    service.importData = function (name, quantity) {
    var r1Promise = feedDataService.importR1Data('fd','td');
    var r2Promise = feedDataService.importR2Data('fd','td');
    var r3Promise = feedDataService.importR3Data('fd','td');
    var r4Promise = feedDataService.importR4Data('fd','td');
    var ProdPromise = feedDataService.importProductData('fd','td');
    $q.all([r1Promise, r2Promise,r3Promise,r4Promise,ProdPromise]).
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
            if(val.prod )feedData.prod=val.prod;
           
        });
        if(feedData.r1) service.updateProductName('r1',feedData.r1,feedData.prod);
        if(feedData.r2) service.updateProductName('r2',feedData.r2,feedData.prod);
        if(feedData.r3) service.updateProductName('r3',feedData.r3,feedData.prod);
        if(feedData.r4) service.updateProductName('r4',feedData.r5,feedData.prod);
        service.updateConsolidationReport();
        
            console.log(feedData);
      
    })
    .catch(function (errorResponse) {
      console.log(errorResponse.message);
    });
  };

 service.getConsolidatedReport=function(){
   return  feedConsolidation;
     
 };    
service.getR1Data=function(){
    return feedConsolidation;
};
    
  service.removeItem = function (itemIndex) {
    feedData.splice(itemIndex, 1);
  };



  service.getItems = function () {
    return feedData;
};
service.getProdItems = function () {
    return FeedProductData;
};
service.setItemsEmpty = function () {
    console.log("Empty");
    feedData={};
};

service.updateConsolidationReport=function(){
     angular.forEach(FeedProductData.r1,function(row){
         var total=[];
           angular.forEach(row,function(val,col){
               
                console.log( '### '+ val);       
           });
     });
};
    

service.updateProductName =function(k,vData,prod )    {
    var data=[];
    angular.forEach(vData,function(d){
//        console.log(d.batch.split('-')[0]);
//        console.log(    d.batch.split('-')[0].substring(1));
        var pdata=$filter('filter')(prod,d.batch.split('-')[0].substring(1));
//        console.log( pdata.length);
        if(pdata.length>0){
             d.prod=pdata[0].prod;
             d.feed=pdata[0].feed;
             d.feed=pdata[0].feed;
             d.stage=pdata[0].stage;
        }else{
            d.prod='Unknow';
            d.feed='Unknow';
            d.feed='Unknow';
            d.stage='Unknow';
        }
//        console.log( angular.toJson(d));
        data.push(d);
        
        
        
    });
    FeedProductData[k]=data;
};
    
};
   

    


FeedDataService.$inject = ['$q', '$timeout','$http'];
function FeedDataService($q,$timeout,$http){
  var service=this;
    service.importR1Data = function (fromDate,toDate) {
    var deferred = $q.defer();
    var feedData = {};
          $timeout(function () {
    $http.get('data.json').then(function (response){
             deferred.resolve({r1:response.data});
            }, function (data){
              deferred.reject(data);
    });
          },3000);

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
    service.importProductData = function (fromDate,toDate) {
    var deferred = $q.defer();
    var feedData = [];
    $http.get('prods.json').then(function (response){
             deferred.resolve({prod:response.data});
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
         $timeout(function () {
        $http.get('data.json').then(function (response){
            report.dailyData=response.data;
            console.log("this is data" + report.dailyData);
            console.log(response.data);
            }, function (data){
                console.log(data);
            });},3000);
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
