var value = ""
var radio1 = document.getElementById('radioStudent');
var radio2 = document.getElementById('radioDate');


radio1.addEventListener( 'change', function() {
        if(this.checked) {
            value = "Estudiante"
            document.getElementById("inputModalStudent").style = "visibility:visible;width: 400px;margin-top: -30px;margin-bottom: 10px;"
            document.getElementById("checkdatemodal").style = "display:none;"
        }
    });



radio2.addEventListener( 'change', function() {
        if(this.checked) {
            value = "Fecha"
            document.getElementById("checkdatemodal").style = "display:visible;"
            document.getElementById("inputModalStudent").style = "display:none;"
        }
    });

function createReport(){

        var date1 = document.getElementById("date1modal").value
        var date2 = document.getElementById("date2modal").value
        var code = document.getElementById("codeStudentModal").value
    
          if(value == "Estudiante"){
            if(code != ""){
              createReportByStudent(code)
            }else{
              alertify.alert("Advertencia!","Ingrese el código de estudiante")
            }
          }else if (value == "Fecha") {
            if(date1 != "" && date2 != ""){
              var date1Parse = Date.parse(date1)
              var date2Parse = Date.parse(date2)
              if(date1Parse < date2Parse || date1Parse == date2Parse){
                createReportByDate(date1Parse,date2Parse)
              }else{
                alertify.alert("Advertencia!","Verifique las fechas!")
              }
            }
           else{
            alertify.alert("Advertencia!","Complete los campos")
           }
          }else{
            alertify.alert("Advertencia!","Seleccione una opción!")
          }
    
      }
    

 function createReportByStudent(code){
   
  firebase.database().ref('registers').orderByChild('code_student').equalTo(code).once("value", function(snapshot) {
    if(snapshot.exists()){
      var array = []
      var count = 0
      var name = ""
        snapshot.forEach(function(current) {
  
            count += 1
            name = current.val().fullname;
            let weightString = current.val().weight;
            const dataSplit = weightString.split("kg");
            var weight = parseFloat(dataSplit[0]);
            var height = current.val().height;

            if (height == ""){
               height = 1.60
            }

            var imc = weight/(height*height)
            var status = ""

            if(imc <19){
              status= "Bajo de peso"
             }else if(imc >= 19 <= 25){
              status= "Peso normal"
             }else if(imc > 25){
              status= "Sobre-Peso "
             }else{
              status= "Obesidad"
             }

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
             var valuesData = []

             valuesData.push(count,weight,imc.toFixed(1),status,finalDate)
             array.push(valuesData)
             
        });
        downloadByStudent(array,code,name)
        
    }else{
      alertify.alert("Advertencia!",'No existe este código!')
    }
    
//result
});

 }

 function createReportByDate(date1,date2){

  

  firebase.database().ref('registers').orderByChild('timestamp').startAt(date1).endAt(date2).once("value", function(snapshot) {

    if(snapshot.exists()){
   
    var array = []
    var count = 0

    snapshot.forEach(function(current) {
        
      count += 1
      var name = current.val().fullname;
      let weightString = current.val().weight;
      const dataSplit = weightString.split("kg");
      var weight = parseFloat(dataSplit[0]);
      var height = current.val().height;
      var carrer = current.val().carrer;
      var code = current.val().code_student;

      if (height == ""){
         height = 1.60
      }

      var imc = weight/(height*height)
      var status = ""

      if(imc <19){
        status= "Bajo de peso"
       }else if(imc >= 19 <= 25){
        status= "Peso normal"
       }else if(imc > 25){
        status= "Sobre-Peso "
       }else{
        status= "Obesidad"
       }

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
       var valuesData = []

       valuesData.push(count,name,code,carrer,weight,imc.toFixed(1),status,finalDate)
       array.push(valuesData)
        
    });
    
    downloadByDate(array,date1,date2)
  }else{
    alertify.alert("Advertencia!",'No existen Datos!')
  }

});
 }

 function downloadByStudent(array,code,name){
  var doc = new jspdf.jsPDF()
  doc.text(7, 9, name+" - "+code);
  doc.autoTable({
    head: [['#', 'Peso', 'IMC','Estado','Fecha']],
    body: array,theme: 'grid',
  })

  doc.save('reporte - '+code+'.pdf')

 }

 function downloadByDate(array,date1,date2){

       var date1x = new Date(date1);
       var theyear = date1x.getFullYear();
       var themonth = date1x.getMonth()+1;
       var thetoday = date1x.getDate();

       if(themonth <= 9){
         themonth = "0"+themonth
       }

       if(thetoday <= 9){
         thetoday = "0"+thetoday
       }

       date1 = thetoday+"/"+themonth+"/"+theyear

       var date2x = new Date(date2);
       var theyear2 = date2x.getFullYear();
       var themonth2 = date2x.getMonth()+1;
       var thetoday2 = date2x.getDate();

       if(themonth2 <= 9){
         themonth2 = "0"+themonth2
       }

       if(thetoday <= 9){
         thetoday2 = "0"+thetoday2
       }


       date2 = thetoday2+"/"+themonth2+"/"+theyear2

  var doc = new jspdf.jsPDF()
  doc.text(7, 9, "Reporte del "+date1+" al "+date2);
  doc.autoTable({
    head: [['#','Nombre','Código','Carrera','Peso','IMC','Estado','Fecha']],
    body: array,theme: 'grid',
  })

  doc.save('reporte '+date1+" - "+date2+'.pdf')

 }