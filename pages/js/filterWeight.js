
var chart
var dataset = []
var count = 0

function checkingCarrer(){
    var checkbox = document.getElementById('cbox1');
    checkbox.addEventListener( 'change', function() {
        if(this.checked) {
           document.getElementById('selectCarrer').style="display:box;margin-top: 20px;border-color: #D81B60;border-width: 1.8px;"
        }else{
            document.getElementById('selectCarrer').style="display:none"
        }
    });
}


function checkingDate(){
    var checkbox = document.getElementById('cbox4');
    checkbox.addEventListener( 'change', function() {
        if(this.checked) {
           document.getElementById('checkdate').style="color: #000;display: box;padding: 15px;"
           document.getElementById('mySpace').style="display: box;"
        }else{
            document.getElementById('checkdate').style="color: #000;display: none;"
            document.getElementById('mySpace').style="display: none;"
        }
    });
}


function checkingByStudent(){
    var checkbox = document.getElementById('cbox3');
    checkbox.addEventListener( 'change', function() {
        if(this.checked) {
           document.getElementById('inputStudent').style="display:box;margin-bottom: -15px;margin-top: 10px;"
           //document.getElementById('input1').style="text-decoration:line-through;"
           document.getElementById('inputCarrer').style="text-decoration:line-through;"
           document.getElementById("cbox1").checked = false;
           document.getElementById("cbox1").disabled = true;
           document.getElementById('selectCarrer').style="display:none"
           document.getElementById('input2').style="display:none"
        }else{
            document.getElementById('inputStudent').style="display:none;margin-bottom: -15px;margin-top: 10px;"
            //document.getElementById('input1').style=""
            document.getElementById('inputCarrer').style=""
            document.getElementById("cbox1").disabled = false;
        }
    });
}


function filterData(){
    //------------------------------------------------------checkboxes---------------------------------------//
    var checkboxCarrer = document.getElementById('cbox1');
    var checkboxStudent = document.getElementById('cbox3');
    var checkboxDate = document.getElementById('cbox4');
    //------------------------------------------------------Elements----------------------------------------//
    var e = document.getElementById("selectCarrer");
    var carrer = e.options[e.selectedIndex].text;
    var codeStudent = document.getElementById("codeStudent").value
    var firstDate = document.getElementById("date1").value
    var secondDate = document.getElementById("date2").value
    //------------------------------------------------------Validations------------------------------------//
      if (checkboxCarrer.checked && !checkboxStudent.checked && !checkboxDate.checked){
        if(carrer != "Seleccione una opción"){
            filterOnlyCarrer(carrer)}else{
              alertify.alert("Advertencia!","Debe seleccionar una carrera")
            }     
       }else if (!checkboxCarrer.checked && checkboxStudent.checked && !checkboxDate.checked){
         if(codeStudent != ""){
          filterOnlyByStudent(codeStudent)
         }
         else{alertify.alert("Advertencia!","Ingrese el código de estudiante!")}         
       }else if (!checkboxCarrer.checked && !checkboxStudent.checked && checkboxDate.checked){
           if(firstDate != "" && secondDate != ""){
            var date1Parse = Date.parse(firstDate)
            var date2Parse = Date.parse(secondDate)
            if(date1Parse < date2Parse ){
                filterOnlyByDate(date1Parse,date2Parse);
            }else{alertify.alert("Advertencia!","Verifique las fechas!")} 
           }else{alertify.alert("Advertencia!","Ingrese correctamente las fechas!")}      
       }else if (!checkboxCarrer.checked && checkboxStudent.checked && checkboxDate.checked){
        if(firstDate != "" && secondDate != ""){
          var date1Parse = Date.parse(firstDate)
          var date2Parse = Date.parse(secondDate)
          if(date1Parse < date2Parse ){
          if(codeStudent != ""){
            filterByDateAndStudent(date1Parse,date2Parse,codeStudent);
          }else{alertify.alert("Advertencia!","Ingrese el código de estudiante!")} 
        }else{alertify.alert("Advertencia!","Verifique las fechas!")}     
        }else{alertify.alert("Advertencia!","Ingrese correctamente las fechas!")}      
       
       }else if (checkboxCarrer.checked && !checkboxStudent.checked && checkboxDate.checked){
        if(carrer != "Seleccione una opción"){
          if(firstDate != "" && secondDate != ""){
            var date1Parse = Date.parse(firstDate)
            var date2Parse = Date.parse(secondDate)
            if(date1Parse < date2Parse ){
              filterByDateAndCarrer(date1Parse,date2Parse,carrer)
            }else{alertify.alert("Advertencia!","Verifique las fechas!")}
        }else{alertify.alert("Advertencia!","Ingrese correctamente las fechas!")}     
        }else{alertify.alert("Advertencia!","Debe seleccionar una carrera!")}
       
       
       }
}

//----------------------------------------------------------------------------------------------------------------------------------------

function filterOnlyCarrer(carrer){
let imcSum = 0
let total = 0

if(count > 0){
  updateChart()
    }
    var btnFilter = document.getElementById('btnFilterData')
    spinner()
    if(carrer != "Todas" ){
        btnFilter.innerHTML = "Obteniendo datos ,  espere..."
        firebase.database().ref('registers').orderByChild('carrer').equalTo(carrer).once("value", function(snapshot) {

          if(snapshot.exists()){
            imcSum = 0
            snapshot.forEach(function(current) {
                let weightString = current.val().weight;
                const dataSplit = weightString.split("kg");
                var weight = parseFloat(dataSplit[0]);
                var height = current.val().height;
                if(height == ""){
                  height = 1.60
                }
                imcSum = imcSum+(weight/(height*height))
                total += 1
                console.log(weight);
                dataset.push(weight)
            });
              initOnlyCarrer(dataset,imcSum,total)
              spinner()
              btnFilter.innerHTML = "Filtrar Datos"
              count += 1
              analisys(imcSum,total)
          }else{
            alertify.alert("Advertencia!","No existen Datos")
            btnFilter.innerHTML = "Filtrar Datos"
          }

            
        });
    }
}

function initOnlyCarrer(weight){
var carrers = ["Derecho y Ciencias Políticas", "Contabilidad y Finanzas", "Administración y Negocios Internacionales", "Ecoturismo", "Educación Inicial y Especial","Educación Primaria en el área de Informática","Educación Matemática y Computación","Medicina Veterinaria y Zootecnia","Enfermería","Ingeniería Sistemas e Informática","Ingeniería Agroindustrial","Ingeniería Forestal y Medio Ambiente"];
var barColors = ["#7F0830", "#3C83FF","#FFF000","#05A80D","#FFA0F2","#CF02B3","#950481","#00B695","#09A6FF","#000000","#E0B700","#70E000"];
var e = document.getElementById("selectCarrer");
var carrer = e.options[e.selectedIndex].text;
var colorPicker = ""
for (var i=0; i<carrers.length; i++){
    if(carrers[i] ==  carrer){
        colorPicker = barColors[i]
    }
}
            chart = new Chart("chartCarrer", {
                type: "line",
                data: {
                  labels: weight,
                  datasets: [{
                    label : carrer,
                    data: weight,
                    borderColor: colorPicker,
                    fill: false
                  }]
                },
                options: {
                  legend: {display: false}
                }
              });
   
}


//----------------------------------------------------------------------------------------------------------------------------------------


function filterOnlyByStudent(codeStudent){
    let imcSum = 0
    let total = 0
    var name = ""
    var btnFilter = document.getElementById('btnFilterData')
    if(count > 0){
        updateChart()
          }
    spinner()
    btnFilter.innerHTML = "Obteniendo datos ,  espere..."
    firebase.database().ref('registers').orderByChild('code_student').equalTo(codeStudent).once("value", function(snapshot) {
        if(snapshot.exists()){
            snapshot.forEach(function(current) {
                name = current.val().fullname;
                let weightString = current.val().weight;
                const dataSplit = weightString.split("kg");
                var weight = parseFloat(dataSplit[0]);
                var height = current.val().height;
                if(height == ""){
                  height = 1.60
                }
                imcSum = imcSum+(weight/(height*height))
                total += 1
                dataset.push(weight)
                btnFilter.innerHTML = "Filtrar Datos"
            });
            initOnlyStudent(dataset,name)
            count += 1
            spinner()
            analisys(imcSum,total)
        }else{
          alertify.alert("Advertencia!",'No existe este código!')
            count = 0
            btnFilter.innerHTML = "Filtrar Datos"
            spinner()
        }
        
    //result
  });
}

function initOnlyStudent(weight,name){
    var xValues = [10,20,30,40,50,60,70,80,90,100,120,140];
            chart = new Chart("chartCarrer", {
                type: "line",
                data: {
                  labels: weight,
                  datasets: [{
                    label : name,
                    data: weight,
                    borderColor: "black",
                    fill: false
                  }]
                },
                options: {
                  legend: {display: false}
                }
              });
}

//----------------------------------------------------------------------------------------------------------------------------------------

function filterOnlyByDate(date1,date2){
    let imcSum = 0
    let total = 0
    var btnFilter = document.getElementById('btnFilterData')
    btnFilter.innerHTML = "Obteniendo datos ,  espere..."
    if(count > 0){
        updateChart()
          }
    spinner()
    firebase.database().ref('registers').orderByChild('timestamp').startAt(date1).endAt(date2).once("value", function(snapshot) {
     
      if(snapshot.exists()){

        snapshot.forEach(function(current) {
          let weightString = current.val().weight;
          const dataSplit = weightString.split("kg");
          var weight = parseFloat(dataSplit[0]);
          var height = current.val().height;
          if(height == ""){
            height = 1.60
          }
          imcSum = imcSum+(weight/(height*height))
          total += 1
          dataset.push(weight)
          console.log(weight)
          
      });
      initOnlyDate(dataset)
      btnFilter.innerHTML = "Filtrar Datos"
      count += 1
      spinner()
      analisys(imcSum,total)
      }else{
        alertify.alert("Advertencia!",'No existen datos!')
        btnFilter.innerHTML = "Filtrar Datos"
      }

    });

}

function initOnlyDate(weight){
            chart = new Chart("chartCarrer", {
                type: "line",
                data: {
                  labels: weight,
                  datasets: [{
                    label : "Peso",
                    data: weight,
                    borderColor: "#0082AF",
                    fill: false
                  }]
                },
                options: {
                  legend: {display: false}
                }
              });
}

//----------------------------------------------------------------------------------------------------------------------------------------

function filterByDateAndStudent(date1,date2,code){
  let imcSum = 0
  let total = 0
  var btnFilter = document.getElementById('btnFilterData')
  var namefilter = ""
  btnFilter.innerHTML = "Obteniendo datos ,  espere..."
  if(count > 0){
      updateChart()
        }
  spinner()
  firebase.database().ref('registers').orderByChild('timestamp').startAt(date1).endAt(date2).once("value", function(snapshot) {
   
    if(snapshot.exists()){
      snapshot.forEach(function(current) {
        var student = current.val().code_student
        if(student == code){
          namefilter = current.val().fullname
          let weightString = current.val().weight;
          const dataSplit = weightString.split("kg");
          var weight = parseFloat(dataSplit[0]);
          var height = current.val().height;
          if(height == ""){
            height = 1.60
          }
          imcSum = imcSum+(weight/(height*height))
          total += 1
          dataset.push(weight)
          console.log(weight)
        }       
      });
        initDateAndStudent(dataset,namefilter+" "+code)
        btnFilter.innerHTML = "Filtrar Datos"
        spinner()    
        analisys(imcSum,total)
    }else{
      alertify.alert("Advertencia!",'No existen datos!')
      btnFilter.innerHTML = "Filtrar Datos"
    }

          
     
  });
}

function initDateAndStudent(weight,name){

  if(weight.length > 0){
    chart = new Chart("chartCarrer", {
      type: "line",
      data: {
        labels: weight,
        datasets: [{
          label : name,
          data: weight,
          borderColor: "#FF780F",
          fill: true,
          backgroundColor: "#FFEEE1"
        }]
      },
      options: {
        legend: {display: false}
      }
    });
    count += 1
  }else{
    count = 0
    alertify.alert("Advertencia!","no existen datos!")
  }
  
}


//----------------------------------------------------------------------------------------------------------------------------------------


function filterByDateAndCarrer(date1,date2,carrer){
  let imcSum = 0
  let total = 0
  var btnFilter = document.getElementById('btnFilterData')
  btnFilter.innerHTML = "Obteniendo datos ,  espere..."
  if(count > 0){
      updateChart()
        }
  spinner()
  firebase.database().ref('registers').orderByChild('timestamp').startAt(date1).endAt(date2).once("value", function(snapshot) {

    if(snapshot.exists()){
      snapshot.forEach(function(current) {
        var carrers = current.val().carrer
        if(carrers == carrer){
          let weightString = current.val().weight;
          const dataSplit = weightString.split("kg");
          var weight = parseFloat(dataSplit[0]);
          var height = current.val().height;
          if(height == ""){
            height = 1.60
          }
          imcSum = imcSum+(weight/(height*height))
          total += 1
          dataset.push(weight)
          console.log(weight)
        }       
      });
        initDateAndCarrer(dataset,carrer)
        btnFilter.innerHTML = "Filtrar Datos"
        spinner()   
        analisys(imcSum,total) 
    }else{
      alertify.alert("Advertencia!","no existen datos!")
      btnFilter.innerHTML = "Filtrar Datos"
    }   
     
  });
}

function initDateAndCarrer(weight,carrer){

  if(weight.length > 0){
    chart = new Chart("chartCarrer", {
      type: "line",
      data: {
        labels: weight,
        datasets: [{
          label : carrer,
          data: weight,
          borderColor: "#FF3289",
          fill: true,
          backgroundColor:"#FFD3E5"
        }]
      },
      options: {
        legend: {display: false}
      }
    });
    count += 1
  }else{
    count = 0
    alertify.alert("Advertencia!","no existen datos!")
  }
  
}


//----------------------------------------------------------------------------------------------------------------------------------------

function updateChart() {
chart.render();
chart.destroy();
chart = null;
    let pos = 0 
    let numElementos = dataset.length
    let elementosEliminados = dataset.splice(pos, numElementos)
  }

function analisys(imcSum,total){
   var media = imcSum/total  
   document.getElementById("dataAnalysis").style  = "display:block;"         
   document.getElementById("imcResult").innerHTML = "Promedio de Índice de masa corporal : "+media.toFixed(0)

   if(media <19){
    document.getElementById("statusImc").innerHTML = "Clasificación : Bajo de peso "
   }else if(media >= 19 <= 25){
    document.getElementById("statusImc").innerHTML = "Clasificación : Peso normal "
   }else if(media > 25){
    document.getElementById("statusImc").innerHTML = "Clasificación : Sobre-Peso "
   }else{
    document.getElementById("statusImc").innerHTML = "Clasificación : Obesidad "
   }
   
}  

function spinner(){
    var x = document.getElementById("div-loader-filter");
    if (x.style.display === "none") {
      x.style.display = "box";
    } else {
      x.style.display = "none";
    }
  }


 