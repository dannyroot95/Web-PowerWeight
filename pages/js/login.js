var key = localStorage.getItem("key");
if(key != null){
  window.open("../pages/dashboard.html", "_self");
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


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    var key = localStorage.getItem("key");
    if(user != null && key !=null){
      //window.open("../pages/dashboard.html", "_self");
    }

  } else {
    var key = localStorage.getItem("key");
    localStorage.removeItem("key");
    //window.open("../pages/sign-in.html", "_self");
  }
});

function logout(){
    var key = localStorage.getItem("key");
    localStorage.removeItem(key);
    firebase.auth().signOut();
    location.reload();
  }

function login(){
  document.getElementById("btn-login").disabled = true;
  spinner();
  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;

  if(userEmail != "" && userPass !=""){
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then((userCredential) => {
        // Signed in
        var user = firebase.auth().currentUser.uid
        firebase.database().ref('users/administrator/'+user).once('value').then((snapshot) => {
          if (snapshot.exists()) {
            var name = snapshot.val().username
            if (window.sessionStorage) {
              spinner();
              localStorage.setItem("key", "session");
              localStorage.setItem("username",name)
              window.open("../pages/dashboard.html", "_self");
            }
            else
             {
              document.getElementById("btn-login").disabled = false;
              spinner();
              throw new Error('Tu Browser no soporta cache!');
            }
          } else {
            spinner();
            alertify.alert("Advertencia!","No existen datos")
          }
        }).catch((error) => {
          spinner();
          alertify.alert("Advertencia!","Error : "+error)
        });


        
         
        // ...
      })
      .catch((error) => {
        document.getElementById("btn-login").disabled = false;
        spinner();
        var errorCode = error.code;
        var errorMessage = error.message;
        alertify.alert("Advertencia!","Código de error : "+errorCode+" "+errorMessage)
      });
  }else{
    document.getElementById("btn-login").disabled = false;
    spinner();
    alertify.alert("Advertencia!","Complete los campos")
  }

  

}

function spinner(){
  var x = document.getElementById("div-loader");
  if (x.style.display === "none") {
    x.style.display = "inline";
  } else {
    x.style.display = "none";
  }
}

function showModal(){
  $(function(){
    $('.trigger-btn').trigger('click');
});
}






