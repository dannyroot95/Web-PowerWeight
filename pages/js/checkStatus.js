firebase.database().ref('users/students').on('value',
  function(dataStudent){
     dataStudent.forEach(
         function(current){
             var id = current.val().rfid;
             var datePay = new Date(current.val().timestamp)
             var dateNow = new Date(Date.now())
             var year1 = datePay.getFullYear();
             var year2 = dateNow.getFullYear(); 
             var month1  =datePay.getMonth(); 
             var month2 = dateNow.getMonth();
             var numberOfMonths;
               if(month1===0){ 
                    month1++; month2++;
                } 
                   numberOfMonths = (year2 - year1) * 12 + (month2 - month1) ;
             if(numberOfMonths >= 3){
               updateStatusDayOfPay(id)
             }
         }
     );
 }),(error)=>{
   console.log(error)
 }
  

 function updateStatusDayOfPay(id){
  var updates = {};
  updates['/users/students/'+id+"/status/"] = "Deudor";
  firebase.database().ref().update(updates);

}

