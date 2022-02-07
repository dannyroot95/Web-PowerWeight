var key = localStorage.getItem("key");
if(key == null){
    window.open("../pages/sign-in.html", "_self");
}

var config = {
    apiKey: "AIzaSyDkQHV92mzcDXtaJfEYbF6GVtkS3PjqDUQ",
    authDomain: "rfid-e67e1.firebaseapp.com",
    databaseURL: "https://rfid-e67e1-default-rtdb.firebaseio.com",
    projectId: "rfid-e67e1",
    storageBucket: "rfid-e67e1.appspot.com",
    messagingSenderId: "234286215031",
    appId: "1:234286215031:web:9e8cf9ed079c5c7be03b72",
    measurementId: "G-6M6CDYHQRH"
  };
  firebase.initializeApp(config);

  
//get data from firebase

var sex = ""
var carrer = ""
var height = ""
var age = ""

  firebase.database().ref('rfid').on('value',function(snapshot){
    if (snapshot.exists()) {
      var codeStudent = snapshot.val().code
      document.getElementById("rfid-student").value = codeStudent
      if(codeStudent != "") {
        firebase.database().ref('users/students/'+codeStudent).once('value').then((snapshot) => {
          if (snapshot.exists()) {
            var code = snapshot.val().code_student
            var name = snapshot.val().fullname
            sex = snapshot.val().sex
            carrer = snapshot.val().carrer
            height = snapshot.val().height
            age = snapshot.val().age
            document.getElementById("code-student").value = code 
            document.getElementById("fullname-student").value = name 

            firebase.database().ref('weight').on('value',
            function(snapshot){
              if (snapshot.exists()) {
                var w = snapshot.val().valueWeight
                if(w != ""){
                  document.getElementById('weight-student').value = w+"kg"
                }
                else{
                  document.getElementById('weight-student').value = "Sin datos!"
                }
              }else{
                alertify.alert("Advertencia!","no existe")
              }});
            
          } else {
            document.getElementById("rfid-student").value = "Código "+codeStudent+" no registrado!"
            document.getElementById("code-student").value = "" 
            document.getElementById("fullname-student").value = ""
            document.getElementById("weight-student").value = ""
          }
        }).catch((error) => {
          alertify.alert("Advertencia!","Error : "+error)
        });
      }else{
            document.getElementById("code-student").value = "" 
            document.getElementById("fullname-student").value = "" 
            document.getElementById("weight-student").value = ""
      }

    } 
    else {
      document.getElementById("rfid-student").value = "Vacío"
    }
  });

  //-------------------------

  

  //var rfid = document.getElementById('rfid-student').text
  

function logout(){
    spinner();
    document.getElementById("btn-logout").disabled = true;
    localStorage.removeItem("key");
    firebase.auth().signOut();
    location.reload();
  }

  function spinner(){
    var x = document.getElementById("div-loader");
    if (x.style.display === "none") {
      x.style.display = "inline";
    } else {
      x.style.display = "none";
    }
  }

  function clickCarrer(sel){
      //alert(sel.options[sel.selectedIndex].text);
  }


  function registerStudent(){

    var fullname = document.getElementById("fullname-student").value
    var codeStudent = document.getElementById("code-student").value
    var rfid = document.getElementById("rfid-student").value
    var weight = document.getElementById("weight-student").value

    const timeElapsed = Date.now();
    const x = new Date(timeElapsed)
    var today = x.toLocaleDateString()
    today = today.split("/");
    var newDate = new Date( today[2], today[1] - 1, today[0]);
    
    if(fullname != ""){

      if(weight !="Sin datos!"){
 // DATA COMPLETE SUCCESS

    firebase.database().ref('registers/').push({
    fullname: fullname,
    code_student: codeStudent,
    rfid : rfid,
    weight : weight,
    timestamp : newDate.getTime(),
    sex : sex,
    carrer : carrer,
    height : height,
    age : age

    }, (error) => {
       if (error) {
              alertify.alert("Advertencia!",'Error');
              } else {
              updatePerson()
              restoreRfid()
              updateWeight()
              //document.getElementById('form').reset();                 
              alertify.alert("Enhorabuena!",'Registro exitoso');
             }
          });
      }

     else{
      alertify.alert("Advertencia!",'Sin datos de peso');
     }
      
    }
    else{
      alertify.alert("Advertencia!","Escanee el RFID del estudiante")
    }
  }

  function updatePerson(){
    var updates = {};
    updates['/person/personValue/'] = "next";
    firebase.database().ref().update(updates);
  }

  function restoreRfid(){
    var updates = {};
    updates['/rfid/code/'] = "";
    firebase.database().ref().update(updates);
  }

  function updateWeight(){
    var updates = {};
    updates['/weight/valueWeight/'] = "";
    firebase.database().ref().update(updates);
  }
  
  function printWeights(){
     
    var doc = new jspdf.jsPDF()

    // Simple data example
   
    // Simple html example
    doc.autoTable({ html: '#myTable' })

    doc.save('reporte-pesos.pdf')
  
}