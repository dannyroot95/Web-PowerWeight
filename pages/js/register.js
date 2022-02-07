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


function logout(){
  firebase.auth().signOut();
  //location.reload();
}

function UserRegister(){
document.getElementById("btn-register").disabled = true;

spinner();
var email = document.getElementById('email').value;
var password = document.getElementById('password').value;
var name = document.getElementById('name').value;
var authorization = document.getElementById('auth').value;

if (email != "" && password != "" && name != "" && authorization != ""){
  if(authorization == "unamad"){
    firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
      var userId = firebase.auth().currentUser.uid
      firebase.database().ref('users/administrator/' + userId).set({
        id : userId,
        username: name,
        email: email,
        profile_picture : "https://firebasestorage.googleapis.com/v0/b/rfid-e67e1.appspot.com/o/default_profile.png?alt=media&token=d10df171-0ef2-41cd-b455-3f071b319959",
      }, (error) => {
        if (error) {
          spinner();
          alertify.alert("Advertencia!",'Error');
          document.getElementById("btn-register").disabled = false;
        } else {
          spinner();
          logout();
          cleanForm();
          showModal();
          
        }
      });
        
    }).catch(function (error){
        spinner();
        alertify.alert("Advertencia!",'Error');
        document.getElementById("btn-register").disabled = false;
        var errorcode = error.code;
        var errormsg = error.message;
    });

  }else{
    spinner();
    document.getElementById("btn-register").disabled = false;
    alertify.alert("Advertencia!",'Clave de autorización inválida');
  }
}else{
    spinner();
    document.getElementById("btn-register").disabled = false;
    alertify.alert("Advertencia!",'Complete los campos!');
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

function cleanForm(){
          document.getElementById('form').reset();
          document.getElementById("btn-register").disabled = false;
}

function showModal(){
  $(function(){
    $('.trigger-btn').trigger('click');
});
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
    SearchTable("nameField");
  }
  else if (type.value==1){
    SearchTable("nameField");
  }
  else if (type.value==2){
    SearchTable("dniField");
  }
}


