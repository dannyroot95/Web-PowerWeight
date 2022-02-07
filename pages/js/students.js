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

  firebase.database().ref('codeCard').on('value',function(snapshot){
    if (snapshot.exists()) {
      var codeStudent = snapshot.val().code
      document.getElementById("rfid-student").value = codeStudent
    } 
    else {
      document.getElementById("rfid-student").value = "Vacío"
    }
  });

  //-------------------------


  function registerStudent(){

    var fullname = document.getElementById("fullname-student").value
    var codeStudent = document.getElementById("code-student").value
    var dniStudent = document.getElementById("dni-student").value
    var e = document.getElementById("selectCarrer");
    var carrer = e.options[e.selectedIndex].text;
    var male = document.getElementById('genderm').checked
    var female = document.getElementById('genderf').checked
    var sex 
    var rfid = document.getElementById("rfid-student").value
    var status = "Pagado"
    var imageProfile = "https://firebasestorage.googleapis.com/v0/b/rfid-e67e1.appspot.com/o/default_profile.png?alt=media&token=d10df171-0ef2-41cd-b455-3f071b319959"
    var height = ""
    var age = ""

    const timeElapsed = Date.now();
    const x = new Date(timeElapsed)
    var today = x.toLocaleDateString()
    today = today.split("/");
    var newDate = new Date( today[2], today[1] - 1, today[0]);

    if(fullname != ""){
      if(codeStudent != ""){
        if(dniStudent != ""){
          if(carrer != "Seleccione una opción"){
            if (male == false && female == false) {
                 alertify.alert("Advertencia!","Seleccione el sexo...")
                 }else{
                       if(male == true){
                       sex = "Masculino"
                     }else{
                       sex = "Femenino"
                     }
                     if(rfid == "" || rfid == "Vacío"){
                      alertify.alert("Advertencia!","Escanee el RFID...")
                     }
                     else{
                    
                  
                       firebase.database().ref('users/students/'+ rfid).set({
                        fullname: fullname,
                        code_student: codeStudent,
                        dni_student : dniStudent,
                        carrer : carrer,
                        sex : sex,
                        rfid : rfid,
                        image_profile : imageProfile,
                        profile_completed : "0",
                        status : status,
                        timestamp :newDate.getTime(),
                        height,
                        age
                      }, (error) => {
                        if (error) {
                          alertify.alert("Advertencia!",'Error');
                        } else {
                          updateRFID()
                          document.getElementById('form').reset();     
                          location.reload();            
                          alertify.alert("Enhorabuena!",'Registro Exitoso!');
                        }
                      });
                   }

       }
     }
     else{
      alertify.alert("Advertencia!","Elija una carrera profesional")
     }
        }
      else{
        alertify.alert("Advertencia!","Ingrese el DNI")
        }
      }//code student
      else{
        alertify.alert("Advertencia!","Ingrese el código del estudiante...")
      }
    }//fullname
    else{
      alertify.alert("Advertencia!","Ingrese el nombre completo")
    }
  }

  function updateRFID(){
    var updates = {};
    updates['/codeCard/code/'] = "";
    firebase.database().ref().update(updates);
  }

