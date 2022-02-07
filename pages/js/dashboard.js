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


function logout(){
    spinner();
    document.getElementById("btn-logout").disabled = true;
    window.localStorage.clear();
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

 
