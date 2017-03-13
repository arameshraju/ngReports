app.service('feedDataService',FeedDataService);
app.service('feedDataListService',FeedDataListService);

FeedDataListService.$inject=['$q','feedDataService','$filter','$rootScope'];
function FeedDataListService($q,feedDataService,$filter,$rootScope){
var service=this;
     var feedData = {};
    var FeedProductData={}
     var feedConsolidation = {};
    

    service.importData = function (fd, td) {
        
    var r1Promise = feedDataService.importR1Data('r1',fd,td);
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
        service.updateConsolidationReport('r1');
        
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

service.updateConsolidationReport=function(u){
    var finalData={};
    var batchChart={};
    var feedChart={};
    var prodChart={};
    var stageChart={};
     angular.forEach(FeedProductData[u],function(row){
         var total=0;
           angular.forEach(row,function(val,col){
               if(col =='date' || col =='shift' || col=='batch' || col=='prod' || col=='feed' || col=='stage' ){
                   //No action
               }else{
                     if(!isNaN(val[0])) total=total+parseInt(val[0]);
   
                   
               }
    
              
           });
         if(batchChart[row['batch']] == undefined){
                batchChart[row['batch']]=total;
            }else{
               batchChart[row['batch']]= parseFloat(batchChart[row['batch']])+parseFloat(total)
         }
         if(prodChart[row['prod']] == undefined){
                prodChart[row['prod']]=total;
            }else{
               prodChart[row['prod']]= parseFloat(prodChart[row['prod']])+parseFloat(total)
         }
         if(feedChart[row['feed']] == undefined){
                feedChart[row['feed']]=total;
            }else{
               feedChart[row['feed']]= parseFloat(feedChart[row['feed']])+parseFloat(total)
         }
         if(stageChart[row['stage']] == undefined){
                stageChart[row['stage']]=total;
            }else{
               stageChart[row['stage']]= parseFloat(stageChart[row['stage']])+parseFloat(total)
         }
         
     });
    
        finalData={prod:service.convertAsLabel(prodChart),
                   feed:service.convertAsLabel(feedChart),stage: service.convertAsLabel(stageChart), barch:service.convertAsLabel(batchChart)};
    console.log(angular.toJson(finalData));
    feedConsolidation = finalData;
    
    $rootScope.$broadcast('consolidate:updated',feedConsolidation);
    
};
    

service.getDetailsReport =function(u,filterParm,value){
     console.log(u + " : "+ filterParm +" : "+ value);
        var data=FeedProductData[u];
        var report={columns:{},Consoldata:{},batchData:{},dateData:{},data:data,rawChart:{},dateChart:{},ProdChart:{},rawDiffChart:{}};
  angular.forEach(data,function(row){
            var total=0;
             angular.forEach(row,function(val,col){
                 report.columns[col]=col;
                    if(col == 'date' || col=='shift' || col=='batch' ||  col=='prod' || col=='feed' || col=='stage' || val[1]==0 || val[0]==0 ){
                        console.log("Not Added");
                    }else{
                        
                        if(!isNaN(val[0])){
                            total+=parseFloat(val[0]);
                                if(report.Consoldata[col] == undefined){
                                    report.Consoldata[col]= [parseFloat(val[0]),parseFloat(val[1]), parseFloat(val[1])-parseFloat(val[0])];
                                }else{
                                    report.Consoldata[col]= [parseFloat(report.Consoldata[col][0])+ parseFloat(val[0]), parseFloat(report.Consoldata[col][1])+ parseFloat(val[1]), parseFloat(report.Consoldata[col][2])+(parseFloat(val[1])-parseFloat(val[0]))];
                                }
                        }
                    }
                
                 
             });
             if(report.batchData[row['batch']] == undefined){
                report.batchData[row['batch']]=total;
            }else{
                report.batchData[row['batch']]= parseFloat(report.batchData[row['batch']])+parseFloat(total)
            }
            if(report.dateData[row['date']] == undefined){
                report.dateData[row['date']]=total;
            }else{
                report.dateData[row['date']]= parseFloat(report.dateData[row['date']])+parseFloat(total)
            }
        });   
            report.rawChart=service.convertAsLabel(report.Consoldata,'0');
            report.rawDiffChart=service.convertAsLabel(report.Consoldata,'2');
            report.dateChart=service.convertAsLabel(report.dateData);
            report.ProdChart=service.convertAsLabel(report.batchData);
        
                 return report;

    
};
    
service.convertAsLabel=function(jObj,param){
    var i=0;
    var chartData={lable:[],data:[]};
  angular.forEach(jObj,function(val,col){
      
                   chartData.lable[i]=col;
                    if (typeof param === 'undefined'){
                        chartData.data[i]=val; 
                    }else if(param =='0') {
                        chartData.data[i]=val[0]; 
                    
                    }else if(param =='2') {
                        chartData.data[i]=val[2]; 
                    }
                    i++;
                
            } );  
    return chartData;
};    

service.updateProductName =function(k,vData,prod )    {
    var data=[];
    angular.forEach(vData,function(d){
        var pdata=$filter('filter')(prod,d.batch.split('-')[0].substring(1));
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
        data.push(d);
        
        
        
    });
    FeedProductData[k]=data;
};
    
};
   

    


FeedDataService.$inject = ['$q', '$timeout','$http'];
function FeedDataService($q,$timeout,$http){
  var service=this;
    var urlName="data.json";
//    var urlName="http://localhost/grow/service.php?";
    
    service.convertDate= function (dateStr){
        console.log(dateStr);
        var d= dateStr.split("-");
        return d[1]+"/"+d[0]  +"/"+d[2];
    };
    service.importR1Data = function (report,fromDate,toDate) {
        var callUrl=urlName + "report="+report+"&fromDate"+ service.convertDate(fromDate)+"&toDate="+ service.convertDate(toDate)+"&";
    var deferred = $q.defer();
    var feedData = {};
          $timeout(function () {
              console.log(callUrl);
    $http.get(callUrl).then(function (response){
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
