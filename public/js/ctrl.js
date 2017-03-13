app.controller('appCtrl',AppCtrl);
app.controller('QAppCtrl',QAppCtrl);
app.controller('consolidateCtrl',ConsolidateCtrl);

QAppCtrl.$inject=['$scope','feedDataListService','$timeout'];
function QAppCtrl($scope,feedDataListService){
    $scope.unitName="r1";
    $scope.master={strdate:'01-02-2017',enddate:'18-02-2017'};
    $scope.itmes=feedDataListService.getItems();
    $scope.prodItmes=feedDataListService.getProdItems();
    $scope.consolidata=feedDataListService.getConsolidatedReport();
//    $scope.showHides={dateDiv:true, consolDiv:false };

    $scope.addActin=function(){
        console.log("strdate :"+ $scope.master.strdate +" enddate: " + $scope.master.strdate);
        feedDataListService.setItemsEmpty();
        feedDataListService.importData($scope.master.strdate,$scope.master.strdate);
        
           $scope.itmes=feedDataListService.getItems();
            $scope.consolidata=feedDataListService.getConsolidatedReport();
    };
      $scope.$on('consolidate:updated', function(event,data) {
           $scope.consolidata=data;
          $scope.updateShowHideDis('consol');
   });
   
$scope.updateShowHideDis=function(divName){
    switch(divName) {
    case 'date':
         $scope.showHides={dateDiv:true, consolDiv:false,detailDiv:false };
        break;
    case 'consol':
         $scope.showHides={dateDiv:false, consolDiv:true, detailDiv:false};
                break;
    case 'details':
         $scope.showHides={dateDiv:false, consolDiv:false,detailDiv:true };

    break;
    default:
        $scope.showHides={dateDiv:true, consolDiv:false, detailDiv:false };
    }  
};
$scope.updateUnit   =function(unit){
    switch(unit) {
    case 'r1':
            $scope.menuActive={r1:'Active',r2:'',r3:'',r4:'',};
            feedDataListService.updateConsolidationReport('r1');
            $scope.unitName="r1";
        break;
    case 'r2':
         $scope.menuActive={r1:'',r2:'',r3:'Active',r4:'',};
            feedDataListService.updateConsolidationReport('r2');
            $scope.unitName="r2";
                break;
    case 'r3':
         $scope.menuActive={r1:'Active',r2:'',r3:'Active',r4:'',};
            feedDataListService.updateConsolidationReport('r3');
            $scope.unitName="r3";
    break;
    case 'r4':
         $scope.menuActive={r1:'',r2:'',r3:'',r4:'Active',};
            feedDataListService.updateConsolidationReport('r4');
            $scope.unitName="r4";
    break;
    default:
            $scope.menuActive={r1:'Active',r2:'',r3:'',r4:'',};
    }  
} ;
    $scope.filterData=function(u,s,data){
       $scope.detailData=feedDataListService.getDetailsReport(u,s,data);

        $scope.updateShowHideDis('details');
        
    };
    $scope.updateShowHideDis('');
    $scope.updateUnit('');
}


ConsolidateCtrl.$inject=['$scope','feedDataListService','$timeout'];
function ConsolidateCtrl($scope,feedDataListService){
     $scope.consolidate=feedDataListService.getR1Data();
    feedDataListService.getConsolidatedReport();
    
}

AppCtrl.$inject=['$scope','DailReport'];
function AppCtrl( $scope,DailReport){
    //Chart Data
    $scope.pieChart={labels:[],data:[]};
    $scope.pieProdChart={labels:[],data:[]};
    $scope.dateChart={labels:[],data:[]};
    $scope.lieChart={labels:[],data:[]};
    $scope.barChart={labels:[],data:[]};
    $scope.labels =$scope.pieChart.labels;// ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
   $scope.data = $scope.pieChart.data;// [300, 500, 100];
//    $scope.master={strdate:new Date(),enddate:new Date().format('dd-mm-yyyy')};
    // Chart 
    $scope.lccolors = ['#45b7cd', '#ff6384', '#ff8e72'];

    $scope.lclabels =$scope.barChart.labels;// ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $scope.lcdata = $scope.barChart.data;

    // Bar chart
     $scope.blabels = $scope.lieChart.labels;// ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
//  $scope.bseries = ['Target', 'Actual'];

  $scope.bdata = $scope.lieChart.data;
    // Chart end
    
    
    $scope.columns={};
    $scope.dailyData=DailReport.getData();
    DailReport.getRestData();
    $scope.btnGet=function(){
        console.log('GetData');
        DailReport.getRestData();
    };
$scope.btnGetWeek=function(){
        console.log('GetData');
        DailReport.getRestDataWeek();
    };
$scope.btnGetMonth=function(){
        console.log('GetData');
        DailReport.getRestDataMonth();
    };
    
    $scope.btnUpdate=function(){
        $scope.columns={};
        $scope.Consoldata={};
        $scope.batchData={};
        $scope.dateData={};
        
        console.log('btnUpdate');
        $scope.dailyData=DailReport.getData();
        angular.forEach($scope.dailyData,function(row){
            var total=0;
            angular.forEach(row,function(val,col){
                    $scope.columns[col]=col;
                    if(col == 'date' || col=='shift' || col=='batch' || val[1]==0 || val[0]==0 ){
                        console.log("Not Added");
                    }else{
                        
                    if(!isNaN(val[0])){
                        total+=parseFloat(val[0]);
                            if($scope.Consoldata[col] == undefined){
                                $scope.Consoldata[col]= [parseFloat(val[0]),parseFloat(val[1]), parseFloat(val[1])-parseFloat(val[0])];
                            }else{
                                $scope.Consoldata[col]= [parseFloat($scope.Consoldata[col][0])+ parseFloat(val[0]), parseFloat($scope.Consoldata[col][1])+ parseFloat(val[1]), parseFloat($scope.Consoldata[col][2])+(parseFloat(val[1])-parseFloat(val[0]))];

                            }
                    }
                        }
                
            });
//            console.log("Batch : " + row['batch']);
            
            if($scope.batchData[row['batch']] == undefined){
                $scope.batchData[row['batch']]=total;
            }else{
                $scope.batchData[row['batch']]= parseFloat($scope.batchData[row['batch']])+parseFloat(total)
            }
          if($scope.dateData[row['date']] == undefined){
                $scope.dateData[row['date']]=total;
            }else{
                $scope.dateData[row['date']]= parseFloat($scope.dateData[row['date']])+parseFloat(total)
            }
            
            
            
        });
    
           /**   
            ******  Chart Data;
            **/
        
        var i=0;
            angular.forEach($scope.Consoldata,function(val,col){
                    $scope.pieChart.labels[i]=col;
                    $scope.pieChart.data[i]=val[0];
                    $scope.barChart.labels[i]=col;
                    $scope.barChart.data[i]=val[2];
                    $scope.lieChart.labels[i]=col;
                    $scope.lieChart.data[i]=val[0];
//                    console.log(col + " : " + val );
                    i++;
                
            } );
        i=0;
          angular.forEach($scope.batchData,function(val,col){
                $scope.pieProdChart.labels[i]=col;
                    $scope.pieProdChart.data[i]=val;  
                i++;
          }); 
        i=0;
          angular.forEach($scope.dateData,function(val,col){
                $scope.dateChart.labels[i]=col;
                    $scope.dateChart.data[i]=Math.round(val/1000);  
                i++;
          });
        
    };
}
