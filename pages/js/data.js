
  function selectAllData(){
    spinner();
    positionItem = [];
    firebase.database().ref('users/students').on('value',
     function(dataStudent){
       if(!dataStudent.exists()){
        alertify.alert("Advertencia!","No existen Datos")
       }
      document.getElementById('tbody1').innerHTML = '';
      item = 0;
        dataStudent.forEach(
            function(current){
                var fullname = current.val().fullname;
                var code = current.val().code_student;
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
                var dni = current.val().dni_student;
                var status = current.val().status;
                var id = current.val().rfid;

                if(numberOfMonths >= 3){
                  updateStatusDayOfPay(id)
                }

                AddItemsToTable(fullname,code,dni,status,id);
                
            }
        );hideSpinner()
        document.getElementById("floatButton").style = "visibility:visible;"
    }),(error)=>{
      hideSpinner()
    }
  }
 
   //--------------------------------FILLING TABLE------------------------------------//

   function AddItemsToTable(fullname,code,dni,status,id){

    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');

    positionItem.push([fullname,code,dni,status,id]);
    td1.innerHTML = ++item;
    td2.innerHTML = fullname;
    td3.innerHTML = code;
    td4.innerHTML = dni;
    td5.innerHTML = status;

    td2.classList += "nameField";
    td4.classList += "dniField";

       if(status == "Pagado"){
        td5.innerHTML = status.fontcolor("#249555").bold()
       }
       else{
        td5.innerHTML = status.fontcolor("#E21818").bold()
       }

       trow.appendChild(td1);
       trow.appendChild(td2);
       trow.appendChild(td3);
       trow.appendChild(td4);
       trow.appendChild(td5);
       var controlDiv = document.createElement("div");
       controlDiv.innerHTML = '<button type="button" data-toggle="modal" data-target="#exampleModalCenter" onClick = "FillBoxItem('+item+')" style="background-color:#18619E;border-radius: 4px;color:#fff;border-color:#000;"><i class="fa fa-edit"></i></button>'
       trow.appendChild(controlDiv);
       tbody.appendChild(trow);

   }


   var modName = document.getElementById('nameModal');
   var modDni = document.getElementById('dniModal');
   var modStatus = document.getElementById('myModalStatus');
   var btnModalUpdate = document.getElementById('updateDataButton');
   var btnPagado = document.getElementById('btnPagado');
   var btnDeudor = document.getElementById('btnDeudor');
   var idStudent = document.getElementById('idModal');

   function FillBoxItem(index){

    if(index==null){
        modName.value = "";
        modDni.value = "";
        modStatus.value = "";
    }
    else{
        --index;
        document.getElementById('nameModal').innerHTML= ''+positionItem[index][0].bold()
        modName.value = positionItem[index][0];
        modDni.value = positionItem[index][2];
        modStatus.innerHTML = positionItem[index][3];
        idStudent.value = positionItem[index][4];
       
        if(positionItem[index][3] == "Pagado"){
          
          modStatus.innerHTML = ''+positionItem[index][3].fontcolor("#249555").bold()
          btnDeudor.style = "visibility:visible;background-color: #FC0000;font: bold;color: white;border-radius: 4px;;border-color:#fff"
          btnPagado.style = "display:none;"

            //btnModalUpdate.style.display = 'none';
        }
        else {
          modStatus.innerHTML = ''+positionItem[index][3].fontcolor("#E21818").bold()
          btnPagado.style = "visibility:visible;background-color: #079235;font: bold;color: white;border-radius: 4px;;border-color:#fff;"
          btnDeudor.style = "display:none;"
            //btnModalUpdate.style.display = 'inline-block';
        }
        
    }


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

var searchBar =  document.getElementById('searchBar');
var searchBtn =  document.getElementById('btnSearch');
var type =  document.getElementById('typeSelected');
var tbody = document.getElementById('tbody1');

function SearchTable(TypeData){
    
  var filter = searchBar.value.toUpperCase();
  var tr = tbody.getElementsByTagName("tr");
  var found;

  for(let i = 0 ; i<tr.length;i++){
    var td = tr[i].getElementsByClassName(TypeData);
    for(let j = 0 ; j<td.length;j++){
      if(td[j].innerHTML.toUpperCase().indexOf(filter) > -1){
        found = true;
      }
    }
    if(found){
      tr[i].style.display="";
      found=false;
    }
    else{
      tr[i].style.display="none";
    }
  }
}

searchBtn.onclick = function(){

  if(searchBar.value==""){
    alertify.alert("Advertencia!","Debe ingresar un DNI o Nombre para buscar!")
    SearchTable("dniField");
  }
  else if (type.value==1){
    document.getElementById("btnReset").style = "display:block;"
    SearchTable("dniField");
  }
  else if (type.value==2){
    document.getElementById("btnReset").style = "display:block;"
    SearchTable("nameField");
  }
}

btnReset.onclick = function(){
  document.getElementById("searchBar").value = ""
  SearchTable("dniField");
  document.getElementById("btnReset").style = "display:none;"
}


function printStudents(){
  var doc = new jspdf.jsPDF()

  // Simple data example
 
  // Simple html example
  doc.autoTable({ html: '#myTable' })

  doc.save('lista-de-estudiantes.pdf')
}

function changeStatusPay(){
  var modStatus = document.getElementById('myModalStatus');
  modStatus.innerHTML = "Pagado"
  modStatus.style = "font-weight: bold;color: #249555;"

}

function changeStatusNotPay(){
  var modStatus = document.getElementById('myModalStatus');
  modStatus.innerHTML = "Deudor"
  modStatus.style = "font-weight: bold;color: #E21818;"
}

function updateData(){

  const timeElapsed = Date.now();
  const x = new Date(timeElapsed)
  var today = x.toLocaleDateString()
  today = today.split("/");
  var newDate = new Date( today[2], today[1] - 1, today[0]);
  var id = document.getElementById("idModal").value
  var modStatus = document.getElementById('myModalStatus');
  var updates = {};


  alertify.confirm("Advertencia!","Se actualizaran los datos , desea continuar?.",
  function(){
    if(modStatus.textContent == "Pagado"){
      updates['/users/students/'+id+"/status/"] = modStatus.textContent;
      updates['/users/students/'+id+"/timestamp/"] = newDate.getTime();
      firebase.database().ref().update(updates);
      selectAllData()
      alertify.success('Datos Actualizados');
    }else{
      updates['/users/students/'+id+"/status/"] = modStatus.textContent;
      firebase.database().ref().update(updates);
      selectAllData()
      alertify.success('Datos Actualizados');
    }
    
  },
  function(){
    alertify.error('Cancelado');
  });

 
}

function deleteData(){
  var id = document.getElementById("idModal").value

  alertify.confirm("Advertencia!","Se eliminaran los datos , desea continuar?.",
  function(){
    firebase.database().ref('users/students/'+id).remove()
    selectAllData()
    selectAllData()
    alertify.success('Datos Eliminados');
  },
  function(){
    alertify.error('Cancelado');
  });
}

function updateStatusDayOfPay(id){
    var updates = {};
    updates['/users/students/'+id+"/status/"] = "Deudor";
    firebase.database().ref().update(updates);

}

