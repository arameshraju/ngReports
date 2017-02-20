app.service('feedDataService',FeedDataService);
app.service('feedDataListService',FeedDataListService);

FeedDataListService.$inject=['$q','feedDataService'];
function FeedDataListService($q,feedDataService){
var service=this;
     var items = [];
    

    service.addItem = function (name, quantity) {
    var namePromise = feedDataService.checkName(name);
    var quantityPromise = feedDataService.checkQuantity(quantity);

    $q.all([namePromise, quantityPromise]).
    then(function (response) {
      var item = {
        name: name,
        quantity: quantity
      };
      items.push(item);
    })
    .catch(function (errorResponse) {
      console.log(errorResponse.message);
    });
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
};
};
        
    


FeedDataService.$inject = ['$q', '$timeout'];
function FeedDataService($q,$timeout){
  var service=this;
    service.checkName = function (name) {
    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for cookies
      if (name.toLowerCase().indexOf('ramesh') === -1) {
        deferred.resolve(result)
      }
      else {
        result.message = "Ramesh is not accepted";
        deferred.reject(result);
      }
    }, 3000);

    return deferred.promise;
  };


  service.checkQuantity = function (quantity) {
    var deferred = $q.defer();
    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for too many boxes
      if (quantity < 6) {
        deferred.resolve(result);
      }
      else {
        result.message = "Quantity should be less";
        deferred.reject(result);
      }
    }, 1000);

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
