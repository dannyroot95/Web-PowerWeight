var date = new Date(Date.now());
              
var themonth = date.getMonth()+1;

if(themonth == 1){
  document.getElementById("month").innerHTML = "Registro mes de ENERO"
}else if(themonth == 2){
  document.getElementById("month").innerHTML = "Registro mes de FEBRERO"
}else if(themonth == 3){
  document.getElementById("month").innerHTML = "Registro mes de MARZO"
}else if(themonth == 4){
  document.getElementById("month").innerHTML = "Registro mes de ABRIL"
}else if(themonth == 5){
  document.getElementById("month").innerHTML = "Registro mes de MAYO"
}else if(themonth == 6){
  document.getElementById("month").innerHTML = "Registro mes de JUNIO"
}else if(themonth == 7){
  document.getElementById("month").innerHTML = "Registro mes de JULIO"
}else if(themonth == 8){
  document.getElementById("month").innerHTML = "Registro mes de AGOSTO"
}else if(themonth == 9){
  document.getElementById("month").innerHTML = "Registro mes de SEPTIEMBRE"
}else if(themonth == 10){
  document.getElementById("month").innerHTML = "Registro mes de OCTUBRE"
}else if(themonth == 11){
  document.getElementById("month").innerHTML = "Registro mes de NOVIEMBRE"
}else{
  document.getElementById("month").innerHTML = "Registro mes de DICIEMBRE"
}

