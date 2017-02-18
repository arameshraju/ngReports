app.directive("baodate", function(){
  return {
    require: "?ngModel",
         scope: {
      value: '=ngModel',
      v_isValidate:'=isCheckDate',
       v_isMinDate:'=isMinDate',
       v_isMaxDate:'=isMaxDate'
    },
    template: "<input ng-model='value' class='form-control' ng-blur='onChange()'>",
    link: function(scope, element, attrs, ngModel){

      if (!ngModel) return;
     
      scope.onChange = function(){
        ngModel.$setViewValue( validateFormateDate(scope.value,scope.v_isValidate*1));
        //ngModel.$setViewValue( validateFormateDate(scope.value,globalMinDate*-1,globalMaxDate*1));
        ngModel.$render();
      };
     
      ngModel.$render = function(){
        scope.value = ngModel.$modelValue;
        
      };
      scope.$watch(function() { return scope.value; }, function(val) {
      });
    }
  };
});

function getFormattedDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();;
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();;
  day = day.length > 1 ? day : '0' + day;
//  return month + '/' + day + '/' + year;
  return day + '-' + month + '-' + year;
}


   function getCurrentDate(rqDate,dateString){
            var curDate=new Date();
           
            var dd= curDate.getDate()<=9?"0"+curDate.getDate():curDate.getDate();
            var mm= curDate.getMonth()<9?"0"+curDate.getMonth()+1:curDate.getMonth()+1;
            var yy= curDate.getFullYear();
            
               if(rqDate=='fullDate'){     
                         return  dd+'-'+mm+'-'+yy;
               }else if(rqDate=='mmyy'){
                    return  dateString+'-'+mm+'-'+yy;
               }else if(rqDate=='yy'){
                    return  dateString+'-'+yy;
               }
               return  dateString;
    }
    function DateSpliter(str){
        
        if(str.indexOf(".")!=-1){
            return str.split('.');
        }else if(str.indexOf("/")!=-1){
            return str.split('/');
        }else{
            return str.split('-');
        }
    }
    function validateFormateDate(frmDate,is_valid){
//                var splitformats=frmDate.split('-');
                var minDt=1000,maxDt=10;
                var splitformats=DateSpliter(frmDate +"");
                
                var sz= splitformats.length ;
                var y=splitformats[2]*1;
                var m=splitformats[1]*1;
                var d=splitformats[0]*1;
//                alert(d + ':' + m + ':'+     y);
                var dMax=31;
                var fy='';
                var fm='';
                var fd='';
                var curDate=new Date();
                //Year Validations
                if(y>999){
                    fy=y+'';
                }else if(y>99){
                    fy='2'+ y;
                }else if(y>9){
                    fy='20'+ y;
                }else if(y==0 || isNaN(y)){
                    if(isNaN(m) )
                        fy= curDate.getFullYear();
                    else if(m>3) {
                         fy= curDate.getFullYear()-1;
                    }else{
                        fy= curDate.getFullYear();
                    }
                }else{
                    fy='201'+ y;
                }
                    //month validation
                    
                if(m<1 || m>12 || isNaN(m)){
                    m=curDate.getMonth()+1;
                   fm= m<9?"0"+m:m;

                }else if(m<=12){
                   fm= m<9?"0"+m:m;
                }
                if(fm=='02'){
                    if(findLeapYear(fm*1)){
                        dMax=29;
                    }else{
                        dMax=28;
                    }
                }else if(fm=='04' || fm=='06' || fm=='09'|| fm=='11'){
                    dMax=30;
                }else{
                    dMax=31;
                }
                //Date Validation
                if( d < 1 || d > dMax || isNaN(d) ){
                    fd=curDate.getDate()<=9?"0"+curDate.getDate():curDate.getDate();
                }else{ 
                    fd=d<=9?'0'+d:d;
                }

               if(is_valid==0){
                   return fd+'-'+fm+'-'+fy;
               }
                        
                return   minMaxDateValidator(fd,fm,fy,minDt,maxDt);
//                
    }
    function minMaxDateValidator(d,m,y,mn,mx){
       var minSec= (new Date()) - (1000 * 3600 * 24*mn);
       var minDate=new Date(minSec);
       var date1=new Date(parseInt(y),parseInt(m)-1,parseInt(d));
       var curDate=new Date();
       var date2=new Date(curDate.getFullYear(),curDate.getMonth(),curDate.getDate());
       var timeDiff = (date2.getTime() - date1.getTime());
       var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
//       if(mn==1){
        if(diffDays>mn){
            alert("You don't have access to this Date,We are Replace with minimum allowed Date ");
            return getFormattedDate(minDate);
        }
            return getFormattedDate(date1);
//       }else{
//            return getFormattedDate(date1);
//       }
        
    }
    function findLeapYear(yr){
        if((yr%4)===0){
            return true;
        }else{
            return false;
        }
    }