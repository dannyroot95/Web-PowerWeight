

function recovery(){
    var email = document.getElementById("recoveryEmail")

    if(email.value != ""){
        email.disabled = true
        document.getElementById("div-loader-rv").style = "position: absolute;margin-left: 8px; display: inline;"
        document.getElementById("btn-rv").disabled = true
        firebase.auth().sendPasswordResetEmail(email.value)
            .then(() => {
          
                Swal.fire(
                    'Enviado!',
                    'Revise su bandeja de entrada ó spam',
                    'success'
                  )
                  document.getElementById("div-loader-rv").style = "display:none;"
                  $('#modalRecovery').modal('hide')
                  email.disabled = false
                  document.getElementById("btn-rv").disabled = false
                  email.value = ""
                }).catch((error) => {
                     var errorCode = error.code;
                     var errorMessage = error.message;
                     document.getElementById("div-loader-rv").style = "display:none;"
                     Swal.fire(
                        'Error!',
                        'Error al enviar solicitud, verifique si tiene una cuenta',
                        'error'
                      )
                    });
                    email.disabled = false
                    document.getElementById("btn-rv").disabled = false
                }else{
                    Swal.fire(
                        'Hey!',
                        'Ingrese un correo electrónico',
                        'warning'
                      )
                }

}

