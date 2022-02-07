
var retrievedObject = localStorage.getItem('dataDashboard');
var js = JSON.parse(retrievedObject)
var retrievedImc = localStorage.getItem('imc');
var dataIMC = JSON.parse(retrievedImc)
var retrievedWoman= localStorage.getItem('itemsWoman');
var dataWoman = JSON.parse(retrievedWoman)
var retrievedMen= localStorage.getItem('itemsMen');
var dataMen = JSON.parse(retrievedMen)
var chart

if(js != null){
  if(js.length > 0){
    document.getElementById('dh-students-registers').innerHTML = js[0]
    document.getElementById("txtPromMale").innerHTML = js[1].toFixed(1)+"kg"   
    document.getElementById("txtPromFemale").innerHTML = js[2].toFixed(1)+"kg"  
    document.getElementById("totalRegisters").innerHTML = js[3]+" Rg" 
    
  }
 
}else{
  firstGraphics()
}

if(dataIMC != null){
  if(dataIMC.length > 0){
    cacheGraphics(dataIMC,dataWoman,dataMen)
  }
}
 

var carrers = ["Derecho y Ciencias Políticas", "Contabilidad y Finanzas", "Administración y Negocios Internacionales", "Ecoturismo", "Educación Inicial y Especial","Educación Primaria en el área de Informática","Educación Matemática y Computación","Medicina Veterinaria y Zootecnia","Enfermería","Ingeniería Sistemas e Informática","Ingeniería Agroindustrial","Ingeniería Forestal y Medio Ambiente"];
var itemsMen = []
var itemsWoman = []
var imc = []
var totalRegister = 0
var totalRegisterFemale = 0
var totalRegisterMale = 0
var sumWeightFemale = 0
var sumWeightMale = 0
var item = 0;


function firstGraphics(){

  spinnerOnStart()
  firebase.database().ref('users/students').on('value',
  function(dataStudent){   
     dataStudent.forEach(
         function(current){
             item++        
         }
     );
     document.getElementById('dh-students-registers').innerHTML = item
 })

  firebase.database().ref('registers').on('value',
   function(dataStudent){   
      dataStudent.forEach(
          function(current){
            totalRegister += 1
            var sex = current.val().sex 
            let weight = current.val().weight;
            var height = current.val().height;

            if(height == ""){
              height = 1.60
            } 

            const dataSplit = weight.split("kg");
            var valueWeght = parseFloat(dataSplit[0]);
            var icmValue = valueWeght/(height*height)
            imc.push(icmValue.toFixed(1)); 
            if(sex == "Masculino"){
                itemsMen.push(valueWeght);
                sumWeightMale = valueWeght+sumWeightMale  
                totalRegisterMale += 1
 
            }else{
                itemsWoman.push(valueWeght);
                sumWeightFemale = valueWeght+sumWeightFemale
                totalRegisterFemale += 1 
               
            }
            
          }
      );  
      spinnerOnStart()
 var promFemaleWeight =  sumWeightFemale/totalRegisterFemale     
 var promMaleWeight =  sumWeightMale/totalRegisterMale  

 document.getElementById("totalRegisters").innerHTML = totalRegister+" Rg"     
 document.getElementById("txtPromFemale").innerHTML = promFemaleWeight.toFixed(1)+"kg"  
 document.getElementById("txtPromMale").innerHTML = promMaleWeight.toFixed(1)+"kg"      
 
var dataUpDashboard = [item,promMaleWeight,promFemaleWeight,totalRegister];
localStorage.setItem('dataDashboard', JSON.stringify(dataUpDashboard));
localStorage.setItem('imc', JSON.stringify(imc));
localStorage.setItem('itemsWoman', JSON.stringify(itemsWoman));
localStorage.setItem('itemsMen', JSON.stringify(itemsMen));


 chart = new Chart("myChart", {
  type: "line",
  data: {
    labels: imc,
    datasets: [{
      label : "Peso de Mujeres",
      data: itemsWoman,
      borderColor: "#EC407A",
      fill: true
    },{
      label : "IMC",
      data: imc,
      borderColor: "#5bbd00",
      fill: true
    },{
      label : "Peso de Varones",
      data: itemsMen,
      borderColor: "#004D8C",
      fill: true
    }]
  },
  options: {
    legend: {display: true}
  }
});
document.getElementById("successTitle").innerHTML = "Gráfico de peso según genero e índice de masa corporal"
  })
}

function cacheGraphics(imc,itemsWoman,itemsMen){
  
  chart = new Chart("myChart", {
    type: "line",
    data: {
      labels: imc,
      datasets: [{
        label : "Peso de Mujeres",
        data: itemsWoman,
        borderColor: "#EC407A",
        fill: true
      },{
        label : "IMC",
        data: imc,
        borderColor: "#5bbd00",
        fill: true
      },{
        label : "Peso de Varones",
        data: itemsMen,
        borderColor: "#004D8C",
        fill: true
      }]
    },
    options: {
      legend: {display: true}
    }
  });
  document.getElementById("successTitle").innerHTML = "Gráfico de peso según genero e índice de masa corporal"

  var imc2 = []
  var itemsMen2 = []
  var itemsWoman2 = []
  
  firebase.database().ref('users/students').on('value',
  function(dataStudent){   
     dataStudent.forEach(
         function(current){
             item++        
         }
     );
     document.getElementById('dh-students-registers').innerHTML = item
 })

  firebase.database().ref('registers').on('value',
   function(dataStudent){   
      dataStudent.forEach(
          function(current){
            totalRegister += 1
            var sex = current.val().sex 
            let weight = current.val().weight;
            var height = current.val().height;

            if(height == ""){
              height = 1.60
            }

            const dataSplit = weight.split("kg");
            var valueWeght = parseFloat(dataSplit[0]);
            var icmValue = valueWeght/(height*height)
            imc2.push(icmValue.toFixed(1)); 
            if(sex == "Masculino"){
                itemsMen2.push(valueWeght);
                sumWeightMale = valueWeght+sumWeightMale  
                totalRegisterMale += 1
 
            }else{
                itemsWoman2.push(valueWeght);
                sumWeightFemale = valueWeght+sumWeightFemale
                totalRegisterFemale += 1 
               
            }
            
          }
      );  
      //removeData(chart)   
      //removeData()
      addData(itemsWoman2,imc2,itemsMen2)
      

 var promFemaleWeight =  sumWeightFemale/totalRegisterFemale     
 var promMaleWeight =  sumWeightMale/totalRegisterMale  

 document.getElementById("totalRegisters").innerHTML = totalRegister+" Rg"     
 document.getElementById("txtPromFemale").innerHTML = promFemaleWeight.toFixed(1)+"kg"  
 document.getElementById("txtPromMale").innerHTML = promMaleWeight.toFixed(1)+"kg"      
 
var dataUpDashboard = [item,promMaleWeight,promFemaleWeight,totalRegister];
localStorage.setItem('dataDashboard', JSON.stringify(dataUpDashboard));
localStorage.setItem('imc', JSON.stringify(imc2));
localStorage.setItem('itemsWoman', JSON.stringify(itemsWoman2));
localStorage.setItem('itemsMen', JSON.stringify(itemsMen2));
        });
 
}



var promDere = 0
var sumDere = 0   
var promConta = 0
var sumConta = 0 
var promAdmin = 0 
var sumAdmin = 0
var promEco = 0 
var sumEco = 0 
var promEdiE = 0
var sumEdiE = 0
var promEpc = 0
var sumEpc = 0
var promEmyC = 0
var sumEmyC = 0
var promMvz = 0
var sumMvz = 0
var promEnfe = 0
var sumEnfe = 0
var promIdsei = 0
var sumIdsei = 0
var promIadt = 0
var sumIadt = 0
var promIfma = 0
var sumIfma = 0
var weightAdmin = 0
var weightDere = 0
var weighCont = 0
var weightEco = 0
var weightEdiE = 0
var weightEpc = 0
var weightEmyc = 0
var weightMvz = 0
var weightEnfe = 0
var weightIdsei= 0
var weightAgro = 0
var weightIfma = 0

firebase.database().ref('registers').on('value',
  function(dataStudent){   
     dataStudent.forEach(
         function(current){
          var carrer = current.val().carrer
          var weight = current.val().weight
            let weightString = current.val().weight;
            const dataSplit = weightString.split("kg");
            var weight = parseFloat(dataSplit[0]);
          if(carrer == "Administración y Negocios Internacionales"){
            promAdmin += 1
            sumAdmin = sumAdmin + weight
          }else if(carrer == "Derecho y Ciencias Políticas"){
            promDere += 1
            sumDere = sumDere + weight
          }else if(carrer == "Contabilidad y Finanzas"){
            promConta += 1
            sumConta = sumConta + weight
          }else if(carrer == "Ecoturismo"){
            promEco += 1
            sumEco = sumEco + weight
          }else if(carrer == "Educación Inicial y Especial"){
            promEdiE += 1
            sumEdiE = sumEdiE + weight
          }else if(carrer == "Educación Primaria en el área de Informática"){
            promEpc += 1
            sumEpc= sumEpc + weight
          }else if(carrer == "Educación Matemática y Computación"){
            promEmyC += 1
            sumEmyC= sumEmyC + weight
          }else if(carrer == "Medicina Veterinaria y Zootecnia"){
            promMvz += 1
            sumMvz= sumMvz + weight
          }else if(carrer == "Enfermería"){
            promEnfe += 1
            sumEnfe = sumEnfe + weight
          }else if(carrer == "Ingeniería Sistemas e Informática"){
            promIdsei += 1
            sumIdsei = sumIdsei + weight
          }else if(carrer == "Ingeniería Agroindustrial"){
            promIadt += 1
            sumIadt = sumIadt + weight
          }else{
            promIfma += 1
            sumIfma = sumIfma + weight
          }
    
    
    })

     weightAdmin = sumAdmin/promAdmin
     weightDere = sumDere/promDere
     weighCont = sumConta/promConta
     weightEco = sumEco/promEco
     weightEdiE = sumEdiE/promEdiE
     weightEpc = sumEpc/promEpc
     weightEmyc = sumEmyC/promEmyC
     weightMvz = sumMvz/promMvz
     weightEnfe = sumEnfe/promEnfe
     weightIdsei= sumIdsei/promIdsei
     weightAgro = sumIadt/promIadt
     weightIfma = sumIfma/promIfma

    myPieChart(promAdmin,promDere)

  });  

  function myPieChart(){
    var xValues = ["Derecho y Ciencias Políticas", "Contabilidad y Finanzas", "Administración y Negocios Internacionales", "Ecoturismo", "Educación Inicial y Especial","Educación Primaria en el área de Informática","Educación Matemática y Computación","Medicina Veterinaria y Zootecnia","Enfermería","Ingeniería Sistemas e Informática","Ingeniería Agroindustrial","Ingeniería Forestal y Medio Ambiente"];
    var yValues = [weightDere.toFixed(1), weighCont.toFixed(1), weightAdmin.toFixed(1) , weightEco.toFixed(1) , weightEdiE.toFixed(1),weightEpc.toFixed(1),weightEmyc.toFixed(1),weightMvz.toFixed(1),weightEnfe.toFixed(1),weightIdsei.toFixed(1),weightAgro.toFixed(1),weightIfma.toFixed(1)];
    var barColors = ["#7F0830", "#3C83FF","#FFF000","#05A80D","#FFA0F2","#CF02B3","#950481","#00B695","#09A6FF","#000000","#E0B700","#70E000"];
    new Chart("myPieChart", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          label : "kg",
          backgroundColor: barColors,
          data: yValues
        }]
      }
    });
    document.getElementById("successPie").style = "display:block;"
  }

  function removeData() {
    chart.data.datasets[0].data.length = 0
    chart.data.datasets[1].data.length = 0
    chart.data.datasets[2].data.length = 0
    //chart.update();
  }

  function addData(data1,data2,data3) {

    removeData()
    chart.data.labels = data2
    chart.data.datasets[0].data = data1
    chart.data.datasets[1].data = data2
    chart.data.datasets[2].data = data3
    chart.update();
  }
  
  function spinnerOnStart(){
    var x = document.getElementById("div-loader-start");
    if (x.style.display === "none") {
      x.style.display = "inline";
    } else {
      x.style.display = "none";
    }
  }

