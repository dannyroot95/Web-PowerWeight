var date = new Date(Date.now());
var item = 0     
var item2 = 0            
var thetoday = date.getDate();
var theyear = date.getFullYear();
var themonth = date.getMonth()+1;

var myMonth = "01"+"/"+themonth+"/"+theyear
myMonth = myMonth.split("/");
var month = new Date( myMonth[2], myMonth[1] - 1, myMonth[0]);

var cod_st = localStorage.getItem('codigo_est');
var pesos = localStorage.getItem('pesos');
var fecha = localStorage.getItem('fecha');
var firstTable = localStorage.getItem('table1');
var secondTable = localStorage.getItem('table2');
console.log(firstTable+" "+secondTable)
var js1 = JSON.parse(cod_st)
var js2 = JSON.parse(pesos)
var js3 = JSON.parse(fecha)

if(cod_st != null){
  document.getElementById("myTable2").style = "visibility:visible;"
  if(cod_st.length > 0){
    item2 = 0
    for(var i = 0 ; i<firstTable; i++){
     AddItemsToTable2(js1[i],js2[i],js3[i])
    }
    $(function(){
      $("tbody").each(function(elem,index){
        var arr = $.makeArray($("tr",this).detach());
        arr.reverse();
          $(this).append(arr);
      });
  });
  }
    localStorage.removeItem('codigo_est');
    localStorage.removeItem('pesos');
    localStorage.removeItem('fecha');
}

function selectAllData(){
 var myCode = []
 var myWeight = []
 var myDate = []
    spinner();
    firebase.database().ref('registers').orderByChild('timestamp').startAt(month.getTime()).on('value',
     function(dataStudent){
       if(!dataStudent.exists()){
        alertify.alert("Advertencia!",'No existen datos!')
       }
      document.getElementById('tbody1').innerHTML = '';
      item = 0
        dataStudent.forEach(
            function(current){
                var code = current.val().code_student;
                var weight = current.val().weight;
                var valueDate = current.val().timestamp;
                var date = new Date(valueDate);
                var theyear = date.getFullYear();
                var themonth = date.getMonth()+1;
                var thetoday = date.getDate();

                if(themonth <= 9){
                  themonth = "0"+themonth
                }

                if(thetoday <= 9){
                  thetoday = "0"+thetoday
                }

                var finalDate = thetoday+"/"+themonth+"/"+theyear
                myCode.push(code)
                myWeight.push(weight)
                myDate.push(finalDate)
                AddItemsToTable(code,weight,finalDate);
            }
            
        );hideSpinner()

        localStorage.setItem('codigo_est', JSON.stringify(myCode));
        localStorage.setItem('pesos', JSON.stringify(myWeight));
        localStorage.setItem('fecha', JSON.stringify(myDate));
               
        $(function(){
          $("tbody").each(function(elem,index){
            var arr = $.makeArray($("tr",this).detach());
            arr.reverse();
              $(this).append(arr);
          });
      });
      document.getElementById("myTable").style = "visibility:visible;"
      document.getElementById("myTable2").style = "display:none;"
      document.getElementById("floatButton").style = "visibility:visible;"
    }),(error)=>{
        hideSpinner()
    }
  }
 
   //--------------------------------FILLING TABLE------------------------------------//

   function AddItemsToTable(code,weight,date){
  
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
      
    td1.innerHTML = ++item;
    td2.innerHTML = code;
    td3.innerHTML = weight;
    td4.innerHTML = date

       trow.appendChild(td1);
       trow.appendChild(td2);
       trow.appendChild(td3);
       trow.appendChild(td4);
       tbody.appendChild(trow);


       localStorage.setItem('table1', item);
       

   }

   function AddItemsToTable2(code,weight,date){
  
    var tbody = document.getElementById('tbody2');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
      
    td1.innerHTML = ++item2;
    td2.innerHTML = code;
    td3.innerHTML = weight;
    td4.innerHTML = date

       trow.appendChild(td1);
       trow.appendChild(td2);
       trow.appendChild(td3);
       trow.appendChild(td4);
       tbody.appendChild(trow);

       
       localStorage.setItem('table2', item2);

   }
   
   $(document).ready(function(){
    $('.font-weight-bold').trigger('click');
    });

    function spinner(){
      var x = document.getElementById("div-loader");
      if (x.style.display === "none") {
        x.style.display = "inline";
      } else {
        x.style.display = "none";
      }
    }

    function hideSpinner(){
        var x = document.getElementById("div-loader");
        x.style.display = "none";
    }


   

   //--------------------------------FILLING TABLE------------------------------------//

   